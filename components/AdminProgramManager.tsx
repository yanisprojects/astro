import React, { useState, useEffect } from 'react';
import { Program, Language } from '../types';
import { saveProgram, deleteProgram, createEmptyProgram } from '../services/programService';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2, Save, X, Edit2, Image as ImageIcon, Globe, Wand2, Loader2 } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

interface Props {
  programs: Program[];
  onUpdate: () => void;
}

export const AdminProgramManager: React.FC<Props> = ({ programs, onUpdate }) => {
  const [editingProgram, setEditingProgram] = useState<Program | null>(null);
  const [activeTab, setActiveTab] = useState<Language>('fr');
  const [isGenerating, setIsGenerating] = useState(false);
  const [pasteContent, setPasteContent] = useState('');
  const [showPasteModal, setShowPasteModal] = useState(false);

  const handleSave = () => {
    if (editingProgram) {
      saveProgram(editingProgram);
      setEditingProgram(null);
      onUpdate();
    }
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this program?')) {
      deleteProgram(id);
      onUpdate();
    }
  };

  const handleCreate = () => {
    setEditingProgram(createEmptyProgram());
  };

  const handleGenerateFromText = async () => {
    if (!pasteContent.trim()) return;
    
    setIsGenerating(true);
    try {
        const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
        // Use the latest stable model if preview is not available, but guidelines say use preview.
        // We will try to use the preview model.
        const model = "gemini-3-flash-preview";
        
        const prompt = `
            You are an expert content organizer for a study abroad agency. 
            I will provide you with raw text about a study program (copied from a competitor or brochure).
            Your task is to extract the information and format it into a JSON object matching the 'Program' interface.
            
            Here is the raw text:
            """
            ${pasteContent}
            """
            
            Please generate a JSON object with the following structure (fill in missing details with reasonable defaults or placeholders if not found):
            {
                "slug": "generate-a-kebab-case-slug-from-title",
                "flag": "find a relevant flag image url from flagcdn.com (e.g. https://flagcdn.com/w320/fr.png)",
                "country": { "fr": "Country Name FR", "en": "Country Name EN", "ar": "Country Name AR" },
                "title": { "fr": "Title FR", "en": "Title EN", "ar": "Title AR" },
                "shortDescription": { "fr": "Short summary FR", "en": "Short summary EN", "ar": "Short summary AR" },
                "longDescription": { "fr": "Detailed description FR", "en": "Detailed description EN", "ar": "Detailed description AR" },
                "deadline": "DD/MM/YYYY (if not found, use a future date)",
                "cost": { "fr": "Cost FR", "en": "Cost EN", "ar": "Cost AR" },
                "timeline": [
                    { "title": { "fr": "Step 1", "en": "Step 1", "ar": "Step 1" }, "date": "Date if any" },
                    { "title": { "fr": "Step 2", "en": "Step 2", "ar": "Step 2" } }
                ],
                "benefits": { "fr": ["Benefit 1", "Benefit 2"], "en": ["Benefit 1", "Benefit 2"], "ar": ["Benefit 1", "Benefit 2"] },
                "details": {
                    "overview": { "fr": "Overview FR", "en": "Overview EN", "ar": "Overview AR" },
                    "eligibility": { "fr": ["Criteria 1"], "en": ["Criteria 1"], "ar": ["Criteria 1"] },
                    "documents": { "fr": ["Doc 1"], "en": ["Doc 1"], "ar": ["Doc 1"] }
                },
                "faqs": [
                    { "question": { "fr": "Q1", "en": "Q1", "ar": "Q1" }, "answer": { "fr": "A1", "en": "A1", "ar": "A1" } }
                ]
            }
            
            IMPORTANT: 
            1. Return ONLY the JSON object, no markdown formatting, no backticks.
            2. For Arabic (ar) fields, ensure the translation is high quality, professional, and uses proper terminology.
            3. Do not generate an 'image' field, I will handle it programmatically.
        `;

        const response = await ai.models.generateContent({
            model: model,
            contents: prompt,
            config: {
                responseMimeType: "application/json"
            }
        });
        
        const jsonStr = response.text.trim();
        const generatedData = JSON.parse(jsonStr);
        
        // Generate a consistent image based on the slug or title
        const seed = generatedData.slug || 'university';
        // Use picsum with seed for consistent random image
        const imageUrl = `https://picsum.photos/seed/${seed}/800/600`;

        // Merge with empty program to ensure ID and structure
        const newProgram = { 
            ...createEmptyProgram(), 
            ...generatedData, 
            image: imageUrl,
            id: Date.now().toString() 
        };
        
        setEditingProgram(newProgram);
        setShowPasteModal(false);
        setPasteContent('');
    } catch (error: any) {
        console.error("Generation failed", error);
        let errorMessage = "Failed to generate program. Please try again.";
        if (error.message?.includes("404")) {
             errorMessage = "AI Model not found. Please check your API key or model availability.";
        }
        alert(errorMessage);
    } finally {
        setIsGenerating(false);
    }
  };

  if (showPasteModal) {
      return (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
              <div className="bg-space-navy border border-white/10 rounded-2xl p-8 max-w-2xl w-full shadow-2xl">
                  <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                      <Wand2 className="text-cyan-bright" /> AI Program Generator
                  </h3>
                  <p className="text-slate-400 mb-6">Paste the text from a competitor's website or brochure below. Our AI will extract the details, translate them, and find relevant images.</p>
                  
                  <textarea 
                      className="w-full h-64 bg-space-black/50 border border-white/10 rounded-xl p-4 text-white focus:border-cyan-bright outline-none mb-6 font-mono text-sm"
                      placeholder="Paste raw text here..."
                      value={pasteContent}
                      onChange={e => setPasteContent(e.target.value)}
                  />
                  
                  <div className="flex justify-end gap-4">
                      <button 
                          onClick={() => setShowPasteModal(false)}
                          className="px-6 py-3 rounded-xl text-slate-300 hover:bg-white/5 transition-colors font-medium"
                      >
                          Cancel
                      </button>
                      <button 
                          onClick={handleGenerateFromText}
                          disabled={isGenerating || !pasteContent.trim()}
                          className="px-6 py-3 rounded-xl bg-cyan-bright text-space-black font-bold hover:bg-white transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                          {isGenerating ? <Loader2 className="animate-spin" /> : <Wand2 size={18} />}
                          {isGenerating ? 'Analyzing...' : 'Generate Program'}
                      </button>
                  </div>
              </div>
          </div>
      );
  }

  if (editingProgram) {
    return (
      <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-white">
            {editingProgram.id ? 'Edit Program' : 'New Program'}
          </h3>
          <button onClick={() => setEditingProgram(null)} className="text-slate-400 hover:text-white">
            <X />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-sm font-medium text-slate-400 mb-1">Slug (URL)</label>
            <input 
              type="text" 
              value={editingProgram.slug} 
              onChange={e => setEditingProgram({...editingProgram, slug: e.target.value})}
              className="w-full bg-space-black/50 border border-white/10 rounded-lg p-3 text-white focus:border-cyan-bright outline-none"
              placeholder="e.g., paris-saclay"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-400 mb-1">Deadline</label>
            <input 
              type="text" 
              value={editingProgram.deadline} 
              onChange={e => setEditingProgram({...editingProgram, deadline: e.target.value})}
              className="w-full bg-space-black/50 border border-white/10 rounded-lg p-3 text-white focus:border-cyan-bright outline-none"
              placeholder="DD/MM/YYYY"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-400 mb-1">Image URL</label>
            <div className="flex gap-2">
                <input 
                type="text" 
                value={editingProgram.image} 
                onChange={e => setEditingProgram({...editingProgram, image: e.target.value})}
                className="w-full bg-space-black/50 border border-white/10 rounded-lg p-3 text-white focus:border-cyan-bright outline-none"
                placeholder="https://..."
                />
                {editingProgram.image && <img src={editingProgram.image} alt="Preview" className="w-12 h-12 rounded object-cover border border-white/10" />}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-400 mb-1">Flag URL</label>
            <div className="flex gap-2">
                <input 
                type="text" 
                value={editingProgram.flag} 
                onChange={e => setEditingProgram({...editingProgram, flag: e.target.value})}
                className="w-full bg-space-black/50 border border-white/10 rounded-lg p-3 text-white focus:border-cyan-bright outline-none"
                placeholder="https://..."
                />
                {editingProgram.flag && <img src={editingProgram.flag} alt="Flag" className="w-12 h-8 rounded object-cover border border-white/10" />}
            </div>
          </div>
        </div>

        {/* Language Tabs */}
        <div className="flex gap-2 mb-4 border-b border-white/10 pb-2">
          {(['fr', 'en', 'ar'] as Language[]).map(lang => (
            <button
              key={lang}
              onClick={() => setActiveTab(lang)}
              className={`px-4 py-2 rounded-t-lg font-medium transition-colors ${activeTab === lang ? 'bg-cyan-bright/10 text-cyan-bright border-b-2 border-cyan-bright' : 'text-slate-400 hover:text-white'}`}
            >
              {lang.toUpperCase()}
            </button>
          ))}
        </div>

        <div className="space-y-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-slate-400 mb-1">Title ({activeTab.toUpperCase()})</label>
            <input 
              type="text" 
              value={editingProgram.title[activeTab] || ''} 
              onChange={e => setEditingProgram({
                ...editingProgram, 
                title: { ...editingProgram.title, [activeTab]: e.target.value }
              })}
              className={`w-full bg-space-black/50 border border-white/10 rounded-lg p-3 text-white focus:border-cyan-bright outline-none ${activeTab === 'ar' ? 'text-right font-arabic' : ''}`}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-400 mb-1">Country ({activeTab.toUpperCase()})</label>
            <input 
              type="text" 
              value={editingProgram.country[activeTab] || ''} 
              onChange={e => setEditingProgram({
                ...editingProgram, 
                country: { ...editingProgram.country, [activeTab]: e.target.value }
              })}
              className={`w-full bg-space-black/50 border border-white/10 rounded-lg p-3 text-white focus:border-cyan-bright outline-none ${activeTab === 'ar' ? 'text-right font-arabic' : ''}`}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-400 mb-1">Short Description ({activeTab.toUpperCase()})</label>
            <textarea 
              rows={2}
              value={editingProgram.shortDescription[activeTab] || ''} 
              onChange={e => setEditingProgram({
                ...editingProgram, 
                shortDescription: { ...editingProgram.shortDescription, [activeTab]: e.target.value }
              })}
              className={`w-full bg-space-black/50 border border-white/10 rounded-lg p-3 text-white focus:border-cyan-bright outline-none ${activeTab === 'ar' ? 'text-right font-arabic' : ''}`}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-400 mb-1">Long Description ({activeTab.toUpperCase()})</label>
            <textarea 
              rows={4}
              value={editingProgram.longDescription[activeTab] || ''} 
              onChange={e => setEditingProgram({
                ...editingProgram, 
                longDescription: { ...editingProgram.longDescription, [activeTab]: e.target.value }
              })}
              className={`w-full bg-space-black/50 border border-white/10 rounded-lg p-3 text-white focus:border-cyan-bright outline-none ${activeTab === 'ar' ? 'text-right font-arabic' : ''}`}
            />
          </div>
        </div>

        <div className="flex justify-end gap-4">
          <button onClick={() => setEditingProgram(null)} className="px-6 py-2 rounded-lg text-slate-300 hover:bg-white/5 transition-colors">Cancel</button>
          <button onClick={handleSave} className="px-6 py-2 rounded-lg bg-cyan-bright text-space-black font-bold hover:bg-white transition-colors flex items-center gap-2">
            <Save size={18} /> Save Program
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Manage Programs</h2>
        <div className="flex gap-3">
            <button onClick={() => setShowPasteModal(true)} className="bg-white/10 text-cyan-bright border border-cyan-bright/30 px-4 py-2 rounded-lg font-bold flex items-center gap-2 hover:bg-cyan-bright hover:text-space-black transition-all">
                <Wand2 size={18} /> AI Import
            </button>
            <button onClick={handleCreate} className="bg-cyan-bright text-space-black px-4 py-2 rounded-lg font-bold flex items-center gap-2 hover:bg-white transition-colors">
                <Plus size={18} /> Add New
            </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        <AnimatePresence>
          {programs.map(program => (
            <motion.div 
              key={program.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white/5 border border-white/10 rounded-xl p-4 flex items-center justify-between group hover:border-cyan-bright/30 transition-all"
            >
              <div className="flex items-center gap-4">
                <img src={program.image} alt={program.title.en} className="w-16 h-16 rounded-lg object-cover bg-space-black" />
                <div>
                  <h3 className="font-bold text-white text-lg">{program.title.en || program.title.fr}</h3>
                  <div className="flex items-center gap-2 text-sm text-slate-400">
                    <span className="bg-white/10 px-2 py-0.5 rounded text-xs uppercase">{program.slug}</span>
                    <span>•</span>
                    <span>{program.deadline}</span>
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <button onClick={() => setEditingProgram(program)} className="p-2 rounded-lg bg-white/5 text-cyan-bright hover:bg-cyan-bright hover:text-space-black transition-colors">
                  <Edit2 size={18} />
                </button>
                <button onClick={() => handleDelete(program.id)} className="p-2 rounded-lg bg-white/5 text-red-400 hover:bg-red-500 hover:text-white transition-colors">
                  <Trash2 size={18} />
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};
