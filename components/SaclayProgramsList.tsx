import React, { useState, useMemo } from 'react';
import { SACLAY_RAW_DATA } from '../data/saclayRaw';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, FileText, ExternalLink, Filter, CheckCircle2, XCircle, ChevronDown, ChevronUp } from 'lucide-react';

interface Program {
  id: string;
  masterName: string;
  type: 'M1' | 'M2';
  name: string;
  url: string;
  requiredDocuments: string[];
}

const parseSaclayData = (text: string): Program[] => {
  const programs: Program[] = [];
  // Split by "MASTER:" but keep the delimiter or just split and ignore the first empty part
  const masterBlocks = text.split('MASTER: ').slice(1);

  masterBlocks.forEach((block, index) => {
    const lines = block.split('\n');
    const masterName = lines[0].trim();
    
    // Extract M1 and M2 sections
    // We use a robust split that handles potential variations
    const m1Split = block.split('M1 PROGRAMS');
    const m2Split = block.split('M2 PROGRAMS');
    
    let m1Section = '';
    let m2Section = '';

    if (m1Split.length > 1) {
        // M1 section exists
        // It ends where M2 starts, or at the end of the block
        const afterM1 = m1Split[1];
        if (afterM1.includes('M2 PROGRAMS')) {
            m1Section = afterM1.split('M2 PROGRAMS')[0];
        } else {
            m1Section = afterM1;
        }
    }

    if (m2Split.length > 1) {
        m2Section = m2Split[1];
    }

    const parseSection = (section: string, type: 'M1' | 'M2') => {
      if (!section) return;
      // Split by the bullet point character used for programs: "▸"
      const entries = section.split('▸ ' + type).slice(1);
      
      entries.forEach(entry => {
        const entryLines = entry.split('\n');
        // First line is like " [1]: program name"
        const nameLine = entryLines[0];
        const nameMatch = nameLine.match(/\[\d+\]: (.*)/);
        const name = nameMatch ? nameMatch[1].trim() : 'Unknown Program';
        
        const urlLine = entryLines.find(l => l.trim().startsWith('URL:'));
        const url = urlLine ? urlLine.trim().replace('URL: ', '') : '#';
        
        const docSplit = entry.split('REQUIRED DOCUMENTS');
        const docs: string[] = [];
        if (docSplit.length > 1) {
           const docSection = docSplit[1];
           const docLines = docSection.split('\n');
           docLines.forEach(l => {
             const trimmed = l.trim();
             if (trimmed.startsWith('•')) {
               docs.push(trimmed.replace('• ', ''));
             }
           });
        }
        
        programs.push({
          id: `${index}-${type}-${name.replace(/\s+/g, '-')}`,
          masterName,
          type,
          name,
          url,
          requiredDocuments: docs
        });
      });
    };

    parseSection(m1Section, 'M1');
    parseSection(m2Section, 'M2');
  });
  
  return programs;
};

const LANGUAGE_KEYWORDS = [
    'TOEFL', 'TOIC', 'IELTS', 'Cambridge', 
    'niveau d\'anglais', 'niveau de langue', 
    'Attestation de français', 'DELF', 'DALF', 'TCF',
    'Justificatifs ... d\'un niveau d\'une langue étrangère',
    'Justificatifs (TOEFL, TOIC, attestation d\'un enseignant…) d\'un niveau d\'une langue étrangère'
];

const hasLanguageRequirement = (docs: string[]) => {
    const lowerDocs = docs.map(d => d.toLowerCase());
    return lowerDocs.some(doc => 
        LANGUAGE_KEYWORDS.some(key => doc.includes(key.toLowerCase()))
    );
};

export const SaclayProgramsList: React.FC = () => {
  const [showExplorer, setShowExplorer] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterNoLanguageCert, setFilterNoLanguageCert] = useState(false);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'M1' | 'M2'>('M1');

  const [selectedField, setSelectedField] = useState<string>('All');

  const allPrograms = useMemo(() => parseSaclayData(SACLAY_RAW_DATA), []);
  
  // Extract unique master names for the filter dropdown
  const uniqueFields = useMemo(() => {
      const fields = new Set(allPrograms.map(p => p.masterName));
      return ['All', ...Array.from(fields).sort()];
  }, [allPrograms]);

  const filteredPrograms = useMemo(() => {
    return allPrograms.filter(p => {
      const matchesSearch = 
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        p.masterName.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesLangFilter = filterNoLanguageCert 
        ? !hasLanguageRequirement(p.requiredDocuments)
        : true;
      
      const matchesTab = p.type === activeTab;
      
      const matchesField = selectedField === 'All' || p.masterName === selectedField;

      return matchesSearch && matchesLangFilter && matchesTab && matchesField;
    });
  }, [allPrograms, searchTerm, filterNoLanguageCert, activeTab, selectedField]);

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  if (!showExplorer) {
      return (
          <button 
            onClick={() => setShowExplorer(true)}
            className="w-full py-4 bg-white/5 border border-white/10 rounded-2xl text-white font-bold hover:bg-white/10 hover:border-cyan-bright/30 transition-all flex items-center justify-center gap-3 group"
          >
              <Search className="w-5 h-5 text-cyan-bright group-hover:scale-110 transition-transform" />
              Explore All Paris-Saclay Programs
          </button>
      );
  }

  return (
    <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-8 bg-space-navy/30 border border-white/10 rounded-3xl p-6 md:p-8 backdrop-blur-sm"
    >
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
            <h3 className="text-2xl font-bold text-white mb-2">Paris-Saclay Programs Explorer</h3>
            <p className="text-slate-400 text-sm">Browse {allPrograms.length} master programs and check requirements.</p>
        </div>
        
        <button 
            onClick={() => setShowExplorer(false)}
            className="text-slate-400 hover:text-white transition-colors"
        >
            <XCircle className="w-6 h-6" />
        </button>
      </div>

      <div className="flex flex-col gap-6 mb-6">
        <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                <input 
                    type="text" 
                    placeholder="Search programs..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-space-black/50 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white focus:border-cyan-bright outline-none text-sm transition-colors"
                />
            </div>
            
            <div className="relative min-w-[200px]">
                <select 
                    value={selectedField}
                    onChange={(e) => setSelectedField(e.target.value)}
                    className="w-full appearance-none bg-space-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-cyan-bright outline-none text-sm transition-colors cursor-pointer"
                >
                    {uniqueFields.map(field => (
                        <option key={field} value={field} className="bg-space-black text-white">
                            {field === 'All' ? 'All Fields' : field}
                        </option>
                    ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4 pointer-events-none" />
            </div>

            <button 
                onClick={() => setFilterNoLanguageCert(!filterNoLanguageCert)}
                className={`flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-medium transition-all border whitespace-nowrap ${
                    filterNoLanguageCert 
                    ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/50 shadow-[0_0_15px_rgba(16,185,129,0.2)]' 
                    : 'bg-white/5 text-slate-300 border-white/10 hover:bg-white/10'
                }`}
            >
                {filterNoLanguageCert ? <CheckCircle2 className="w-4 h-4" /> : <Filter className="w-4 h-4" />}
                No Language Cert
            </button>
        </div>

        <div className="flex p-1 bg-space-black/40 rounded-xl border border-white/5 self-start">
            {(['M1', 'M2'] as const).map((tab) => (
                <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${
                        activeTab === tab 
                        ? 'bg-cyan-bright text-space-black shadow-lg' 
                        : 'text-slate-400 hover:text-white'
                    }`}
                >
                    Master {tab === 'M1' ? '1' : '2'}
                </button>
            ))}
        </div>
      </div>

      <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
        {filteredPrograms.length === 0 ? (
            <div className="text-center py-12 text-slate-500 bg-white/5 rounded-2xl border border-white/5 border-dashed">
                No programs found matching your criteria.
            </div>
        ) : (
            filteredPrograms.map(program => {
                const hasLangReq = hasLanguageRequirement(program.requiredDocuments);
                const isExpanded = expandedId === program.id;

                return (
                    <motion.div 
                        key={program.id}
                        layout
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className={`bg-white/5 border border-white/5 rounded-xl overflow-hidden transition-all duration-300 ${isExpanded ? 'bg-white/10 border-cyan-bright/30 shadow-[0_0_20px_rgba(34,211,238,0.1)]' : 'hover:bg-white/10'}`}
                    >
                        <div 
                            onClick={() => toggleExpand(program.id)}
                            className="p-4 cursor-pointer flex items-center justify-between gap-4"
                        >
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-1">
                                    <span className="text-xs text-cyan-bright/80 uppercase tracking-wider font-bold truncate">{program.masterName}</span>
                                </div>
                                <h4 className="text-white font-medium truncate pr-4">{program.name}</h4>
                            </div>
                            
                            <div className="flex items-center gap-3 flex-shrink-0">
                                {!hasLangReq ? (
                                    <div className="hidden sm:flex items-center gap-1.5 text-[10px] uppercase tracking-wider font-bold text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded-full border border-emerald-500/20">
                                        <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                                        <span>No Cert</span>
                                    </div>
                                ) : (
                                    <div className="hidden sm:flex items-center gap-1.5 text-[10px] uppercase tracking-wider font-bold text-rose-400 bg-rose-500/10 px-2 py-1 rounded-full border border-rose-500/20">
                                        <div className="w-2 h-2 rounded-full bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.5)]" />
                                        <span>Cert Req</span>
                                    </div>
                                )}
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${isExpanded ? 'bg-cyan-bright text-space-black' : 'bg-white/10 text-slate-400'}`}>
                                    {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                                </div>
                            </div>
                        </div>

                        <AnimatePresence>
                            {isExpanded && (
                                <motion.div 
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    className="border-t border-white/10 bg-space-black/30"
                                >
                                    <div className="p-5">
                                        <div className="flex justify-between items-center mb-4 pb-4 border-b border-white/5">
                                            <h5 className="text-sm font-bold text-cyan-bright flex items-center gap-2">
                                                <FileText className="w-4 h-4" /> Required Documents
                                            </h5>
                                            <a 
                                                href={program.url} 
                                                target="_blank" 
                                                rel="noopener noreferrer"
                                                className="text-xs font-bold flex items-center gap-1.5 text-white bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-lg transition-colors"
                                            >
                                                Official Page <ExternalLink className="w-3 h-3" />
                                            </a>
                                        </div>
                                        
                                        <ul className="grid grid-cols-1 gap-2">
                                            {program.requiredDocuments.map((doc, i) => {
                                                const isLangDoc = LANGUAGE_KEYWORDS.some(k => doc.toLowerCase().includes(k.toLowerCase()));
                                                return (
                                                    <li key={i} className={`text-sm flex items-start gap-3 p-2 rounded-lg ${isLangDoc ? 'bg-amber-500/10 text-amber-200 border border-amber-500/20' : 'text-slate-300'}`}>
                                                        <span className={`mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0 ${isLangDoc ? 'bg-amber-400' : 'bg-slate-500'}`} />
                                                        <span>{doc}</span>
                                                    </li>
                                                );
                                            })}
                                        </ul>
                                        
                                        {program.requiredDocuments.length === 0 && (
                                            <p className="text-sm text-slate-500 italic text-center py-4">No specific documents listed. Please check the official page.</p>
                                        )}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                );
            })
        )}
      </div>
    </motion.div>
  );
};
