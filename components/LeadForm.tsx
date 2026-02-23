import React, { useState } from 'react';
import { Language, Program } from '../types';
import { TRANSLATIONS } from '../constants';
import { saveLead } from '../services/leadService';
import { motion } from 'framer-motion';

interface Props {
  lang: Language;
  programs: Program[];
  initialProgramSlug?: string;
}

export const LeadForm: React.FC<Props> = ({ lang, programs, initialProgramSlug }) => {
  const t = TRANSLATIONS[lang];
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    country: '',
    programInterest: initialProgramSlug || '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    
    // Simulate network delay
    setTimeout(() => {
      const saveSuccess = saveLead(formData);
      if (saveSuccess) {
        setStatus('success');
        setFormData({ name: '', email: '', phone: '', country: '', programInterest: '', message: '' });
      }
    }, 1000);
  };

  const inputClasses = "w-full bg-space-black/50 border border-white/10 rounded-lg p-3 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-bright focus:ring-1 focus:ring-cyan-bright transition-all shadow-inner";
  const labelClasses = "block text-sm font-medium text-slate-400 mb-1";

  if (status === 'success') {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-emerald-900/20 border border-emerald-500/30 rounded-2xl p-8 text-center"
      >
        <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-emerald-500/50">
          <svg className="w-8 h-8 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
        </div>
        <h3 className="text-2xl font-bold text-white mb-2">{t.form_success}</h3>
        <button onClick={() => setStatus('idle')} className="mt-4 text-emerald-400 font-medium hover:underline hover:text-emerald-300">Send another</button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className={labelClasses}>{t.form_name}</label>
          <input 
            required
            type="text" 
            className={inputClasses}
            value={formData.name}
            onChange={e => setFormData({...formData, name: e.target.value})}
          />
        </div>
        <div>
          <label className={labelClasses}>{t.form_email}</label>
          <input 
            required
            type="email" 
            className={inputClasses}
            value={formData.email}
            onChange={e => setFormData({...formData, email: e.target.value})}
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className={labelClasses}>{t.form_phone}</label>
          <input 
            required
            type="tel" 
            className={inputClasses}
            value={formData.phone}
            onChange={e => setFormData({...formData, phone: e.target.value})}
          />
        </div>
        <div>
          <label className={labelClasses}>{t.form_country}</label>
          <input 
            required
            type="text" 
            className={inputClasses}
            value={formData.country}
            onChange={e => setFormData({...formData, country: e.target.value})}
          />
        </div>
      </div>

      <div>
        <label className={labelClasses}>{t.form_program}</label>
        <select 
          className={inputClasses}
          value={formData.programInterest}
          onChange={e => setFormData({...formData, programInterest: e.target.value})}
        >
          <option value="" className="bg-space-black text-slate-400">-- Select --</option>
          {programs.map(p => (
            <option key={p.id} value={p.slug} className="bg-space-black text-white">{p.title[lang]}</option>
          ))}
          <option value="other" className="bg-space-black text-white">Other / Autre / آخر</option>
        </select>
      </div>

      <div>
        <label className={labelClasses}>{t.form_message}</label>
        <textarea 
          required
          rows={4}
          className={inputClasses}
          value={formData.message}
          onChange={e => setFormData({...formData, message: e.target.value})}
        />
      </div>

      <button 
        type="submit" 
        disabled={status === 'submitting'}
        className="w-full bg-cyan-bright text-space-black font-bold py-4 rounded-lg shadow-[0_0_15px_rgba(34,211,238,0.3)] hover:shadow-[0_0_25px_rgba(34,211,238,0.5)] transform hover:-translate-y-1 transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white"
      >
        {status === 'submitting' ? '...' : t.form_submit}
      </button>
    </form>
  );
};