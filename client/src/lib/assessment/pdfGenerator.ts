import { AssessmentResults } from './scoring';
import { getRecommendationsForLevel } from './recommendations';
import { EmailCaptureData } from '@/components/assessment/EmailCaptureModal';
import { logger } from '@/lib/logger';

// Lazy load jsPDF only when needed - use string-based dynamic import to avoid Vite resolution
async function loadJsPDF() {
  // Check if already loaded globally (from CDN)
  if (typeof window !== 'undefined' && window.jspdf) {
    return window.jspdf.jsPDF;
  }
  
  try {
    // Try to import from node_modules using Function constructor to avoid static analysis
    const importFunc = new Function('specifier', 'return import(specifier)');
    const module = await importFunc('jspdf');
    return module.default || module.jsPDF || module;
  } catch (npmError) {
    try {
      // Fallback: load from CDN
      logger.tagged('PDFGenerator').log('Loading jsPDF from CDN...');
      await new Promise<void>((resolve, reject) => {
        if ((window as any).jspdf) {
          resolve();
          return;
        }
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/3.0.2/jspdf.umd.min.js';
        script.onload = () => resolve();
        script.onerror = () => reject(new Error('Failed to load jsPDF from CDN'));
        document.head.appendChild(script);
      });
      return window.jspdf?.jsPDF ?? null;
    } catch (cdnError) {
      logger.tagged('PDFGenerator').warn('Failed to load jsPDF:', { npmError, cdnError });
      return null;
    }
  }
}

export async function generatePDFReport(
  results: AssessmentResults,
  userData: EmailCaptureData
): Promise<void> {
  // Try to load jsPDF dynamically
  const jsPDF = await loadJsPDF();
  
  if (!jsPDF) {
    // Fallback: download as text file if jsPDF not available
    logger.tagged('PDFGenerator').warn('jsPDF not available, falling back to text report');
    // Fallback: download as text file
    const recommendations = getRecommendationsForLevel(results.maturityLevel);
    const reportText = `
╔══════════════════════════════════════════════════════════════╗
║         ÉVALUATION DE MATURITÉ IA - RAPPORT COMPLET          ║
╚══════════════════════════════════════════════════════════════╝

Entreprise: ${userData.company}
Date: ${new Date().toLocaleDateString('fr-FR', { 
  year: 'numeric', 
  month: 'long', 
  day: 'numeric' 
})}
Contact: ${userData.firstName} ${userData.lastName} (${userData.email})

═══════════════════════════════════════════════════════════════

SCORE GLOBAL: ${results.globalScore}/100
NIVEAU DE MATURITÉ: ${results.maturityLevel}

${results.maturityDescription}

═══════════════════════════════════════════════════════════════

SCORES PAR DIMENSION:

${results.dimensionScores.map(d => {
  const bar = '█'.repeat(Math.floor(d.score / 5)) + '░'.repeat(20 - Math.floor(d.score / 5));
  return `${d.label.padEnd(30)} ${bar} ${d.score}/100`;
}).join('\n')}

═══════════════════════════════════════════════════════════════

CARACTÉRISTIQUES DE VOTRE NIVEAU:

${recommendations.characteristics.map(c => `• ${c}`).join('\n')}

═══════════════════════════════════════════════════════════════

RECOMMANDATIONS PRIORITAIRES:

${recommendations.topRecommendations.map((rec, idx) => `
${idx + 1}. ${rec.title}
   Impact: ${rec.impact} | Effort: ${rec.effort} | Timeline: ${rec.timeline}
   ${rec.description}
`).join('\n')}

═══════════════════════════════════════════════════════════════

PROCHAINES ÉTAPES:

${recommendations.nextSteps.map((step, idx) => `${idx + 1}. ${step.title} (${step.duration})`).join('\n')}

═══════════════════════════════════════════════════════════════

À PROPOS DE NUKLEO DIGITAL

Nukleo Digital est une agence de transformation IA spécialisée dans 
l'accompagnement des entreprises québécoises et canadiennes dans leur 
parcours d'adoption de l'intelligence artificielle.

Services:
• Stratégie IA alignée avec vos objectifs business
• Développement de solutions IA sur mesure
• Formation et accompagnement de vos équipes
• Plateformes MLOps et gouvernance IA

Contact: hello@nukleo.com
Site web: www.nukleo.digital

═══════════════════════════════════════════════════════════════
    `.trim();
    
    const blob = new Blob([reportText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `nukleo-ai-readiness-report-${userData.company.replace(/\s+/g, '-')}-${Date.now()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    return;
  }

  // If jsPDF is available, generate PDF
  const pdf = new jsPDF('p', 'mm', 'a4');
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  const margin = 20;
  let yPosition = margin;

  // Helper function to add new page if needed
  const checkNewPage = (requiredHeight: number) => {
    if (yPosition + requiredHeight > pageHeight - margin) {
      pdf.addPage();
      yPosition = margin;
    }
  };

  // Page 1: Cover
  pdf.setFillColor(139, 92, 246); // Purple
  pdf.rect(0, 0, pageWidth, pageHeight, 'F');
  
  pdf.setTextColor(255, 255, 255);
  pdf.setFontSize(32);
  pdf.text('Évaluation de Maturité IA', pageWidth / 2, 80, { align: 'center' });
  
  pdf.setFontSize(18);
  pdf.text(userData.company, pageWidth / 2, 100, { align: 'center' });
  
  pdf.setFontSize(14);
  pdf.text(new Date().toLocaleDateString('fr-FR', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  }), pageWidth / 2, 115, { align: 'center' });

  // Maturity level badge
  const maturityColor = getMaturityColorHex(results.maturityLevel);
  pdf.setFillColor(...maturityColor);
  pdf.roundedRect(pageWidth / 2 - 40, 130, 80, 20, 5, 5, 'F');
  pdf.setTextColor(255, 255, 255);
  pdf.setFontSize(16);
  pdf.text(results.maturityLevel, pageWidth / 2, 142, { align: 'center' });

  pdf.addPage();

  // Page 2: Executive Summary
  yPosition = margin;
  pdf.setTextColor(0, 0, 0);
  pdf.setFontSize(24);
  pdf.text('Résumé Exécutif', margin, yPosition);
  yPosition += 15;

  // Global Score
  pdf.setFontSize(48);
  pdf.setTextColor(139, 92, 246);
  pdf.text(`${results.globalScore}`, margin, yPosition);
  pdf.setFontSize(18);
  pdf.setTextColor(100, 100, 100);
  pdf.text('/100', margin + 30, yPosition - 5);
  yPosition += 20;

  pdf.setFontSize(12);
  pdf.setTextColor(0, 0, 0);
  pdf.text(`Niveau de maturité: ${results.maturityLevel}`, margin, yPosition);
  yPosition += 10;

  pdf.setFontSize(11);
  pdf.text(results.maturityDescription, margin, yPosition, { 
    maxWidth: pageWidth - 2 * margin,
    align: 'left'
  });
  yPosition += 20;

  // Dimension Scores
  pdf.setFontSize(16);
  pdf.text('Scores par Dimension', margin, yPosition);
  yPosition += 10;

  results.dimensionScores.forEach((dim) => {
    checkNewPage(15);
    pdf.setFontSize(11);
    pdf.setTextColor(0, 0, 0);
    pdf.text(dim.label, margin, yPosition);
    
    // Score bar
    const barWidth = 100;
    const barHeight = 5;
    const scoreWidth = (dim.score / 100) * barWidth;
    
    pdf.setFillColor(200, 200, 200);
    pdf.rect(pageWidth - margin - barWidth, yPosition - 4, barWidth, barHeight, 'F');
    
    const scoreColor = getScoreColorHex(dim.score);
    pdf.setFillColor(...scoreColor);
    pdf.rect(pageWidth - margin - barWidth, yPosition - 4, scoreWidth, barHeight, 'F');
    
    pdf.text(`${dim.score}/100`, pageWidth - margin - barWidth - 25, yPosition);
    yPosition += 12;
  });

  pdf.addPage();
  yPosition = margin;

  // Page 3+: Recommendations
  const recommendations = getRecommendationsForLevel(results.maturityLevel);
  
  pdf.setFontSize(20);
  pdf.text('Recommandations Prioritaires', margin, yPosition);
  yPosition += 15;

  recommendations.topRecommendations.forEach((rec, idx) => {
    checkNewPage(40);
    
    pdf.setFontSize(14);
    pdf.setTextColor(139, 92, 246);
    pdf.text(`${idx + 1}. ${rec.title}`, margin, yPosition);
    yPosition += 8;

    pdf.setFontSize(10);
    pdf.setTextColor(0, 0, 0);
    pdf.text(rec.description, margin, yPosition, { 
      maxWidth: pageWidth - 2 * margin 
    });
    yPosition += 10;

    pdf.setFontSize(9);
    pdf.setTextColor(100, 100, 100);
    pdf.text(`Impact: ${rec.impact} | Effort: ${rec.effort} | Timeline: ${rec.timeline}`, margin, yPosition);
    yPosition += 12;
  });

  pdf.addPage();
  yPosition = margin;

  // Next Steps
  pdf.setFontSize(20);
  pdf.text('Prochaines Étapes', margin, yPosition);
  yPosition += 15;

  recommendations.nextSteps.forEach((step, idx) => {
    checkNewPage(15);
    pdf.setFontSize(12);
    pdf.setTextColor(0, 0, 0);
    pdf.text(`${idx + 1}. ${step.title}`, margin + 10, yPosition);
    pdf.setFontSize(10);
    pdf.setTextColor(100, 100, 100);
    pdf.text(`(${step.duration})`, pageWidth - margin - 50, yPosition);
    yPosition += 12;
  });

  // About Nukleo
  pdf.addPage();
  yPosition = margin;
  
  pdf.setFontSize(20);
  pdf.text('À Propos de Nukleo Digital', margin, yPosition);
  yPosition += 15;

  pdf.setFontSize(11);
  pdf.setTextColor(0, 0, 0);
  const aboutText = `Nukleo Digital est une agence de transformation IA spécialisée dans l'accompagnement des entreprises québécoises et canadiennes dans leur parcours d'adoption de l'intelligence artificielle.

Nous offrons:
• Stratégie IA alignée avec vos objectifs business
• Développement de solutions IA sur mesure
• Formation et accompagnement de vos équipes
• Plateformes MLOps et gouvernance IA

Pour discuter de votre roadmap IA personnalisée, contactez-nous:
hello@nukleo.com
www.nukleo.digital`;

  pdf.text(aboutText, margin, yPosition, { 
    maxWidth: pageWidth - 2 * margin,
    align: 'left'
  });

  // Save PDF
  pdf.save(`nukleo-ai-readiness-report-${userData.company.replace(/\s+/g, '-')}-${Date.now()}.pdf`);
}

function getMaturityColorHex(level: string): [number, number, number] {
  switch (level) {
    case 'Explorer': return [239, 68, 68]; // red
    case 'Experimenter': return [245, 158, 11]; // orange
    case 'Adopter': return [234, 179, 8]; // yellow
    case 'Integrator': return [132, 204, 22]; // lime
    case 'AI Leader': return [34, 197, 94]; // green
    default: return [82, 61, 203]; // #523DCB
  }
}

function getScoreColorHex(score: number): [number, number, number] {
  if (score < 40) return [239, 68, 68]; // red
  if (score < 70) return [234, 179, 8]; // yellow
  return [34, 197, 94]; // green
}
