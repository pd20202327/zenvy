import { useState } from 'react';
import { AssessmentResult, AssessmentSectionKey, Assessment } from '@/types/assessment';
import { answerOptions } from '@/data/assessmentData';
import jsPDF from 'jspdf';

interface UseAssessmentScoringProps {
  assessment: Assessment;
  sectionKeys: AssessmentSectionKey[];
  setShowResults: (show: boolean) => void;
}

export const useAssessmentScoring = ({
  assessment,
  sectionKeys,
  setShowResults
}: UseAssessmentScoringProps) => {
  const [assessmentResult, setAssessmentResult] = useState<AssessmentResult | null>(null);

  const drawProgressBar = (doc: jsPDF, x: number, y: number, width: number, value: number, maxValue: number) => {
    const barHeight = 10;
    const percentage = (value / maxValue) * 100;
    const barWidth = (width * percentage) / 100;
    
    // Draw background bar
    doc.setFillColor(240, 240, 240);
    doc.rect(x, y, width, barHeight, 'F');
    
    // Draw progress bar
    doc.setFillColor(92, 204, 195);
    doc.rect(x, y, barWidth, barHeight, 'F');
    
    // Draw percentage text
    doc.setFontSize(8);
    doc.setTextColor(60, 60, 60);
    doc.text(`${Math.round(percentage)}%`, x + width + 5, y + 7);
  };

  // Calculate results for each section and overall
  const calculateResults = () => {
    const result: AssessmentResult = {
      sectionScores: {} as any,
      totalScore: 0,
      totalMaxScore: 0,
      totalPercentage: 0
    };

    let totalScore = 0;
    let totalMaxScore = 0;

    // Calculate score for each section
    sectionKeys.forEach(sectionKey => {
      const section = assessment.sections[sectionKey];
      const sectionQuestions = section.questions;
      let sectionScore = 0;

      sectionQuestions.forEach(question => {
        const answer = assessment.answers[question.id] || 0;
        sectionScore += answer;
      });

      totalScore += sectionScore;
      totalMaxScore += section.maxScore;

      const percentage = (sectionScore / section.maxScore) * 100;
      
      // Find the severity level
      let severityLabel = '';
      let severityDescription = '';
      
      for (const [key, level] of Object.entries(section.severityLevels)) {
        if (sectionScore >= level.min && sectionScore <= level.max) {
          severityLabel = level.label;
          severityDescription = level.description;
          break;
        }
      }

      result.sectionScores[sectionKey] = {
        score: sectionScore,
        maxScore: section.maxScore,
        percentage,
        severityLabel,
        severityDescription
      };
    });

    result.totalScore = totalScore;
    result.totalMaxScore = totalMaxScore;
    result.totalPercentage = (totalScore / totalMaxScore) * 100;

    setAssessmentResult(result);
    setShowResults(true);
  };

  // Download results as a PDF file
  const downloadResults = () => {
    if (!assessmentResult) return;
    
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 20;
    let yPosition = 20;
    
    // Updated title
    doc.setFontSize(18);
    doc.setFont('helvetica', 'bold');
    doc.text('Zenvy Assessment Results', pageWidth / 2, yPosition, { align: 'center' });
    yPosition += 10;
    
    // Date
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text(`Generated on: ${new Date().toLocaleDateString()}`, pageWidth / 2, yPosition, { align: 'center' });
    yPosition += 15;
    
    // Section divider
    doc.setDrawColor(200, 200, 200);
    doc.line(margin, yPosition, pageWidth - margin, yPosition);
    yPosition += 10;
    
    // Overall score
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('Overall Score', margin, yPosition);
    yPosition += 7;
    
    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    doc.text(
      `${assessmentResult.totalScore}/${assessmentResult.totalMaxScore} (${assessmentResult.totalPercentage.toFixed(1)}%)`, 
      margin, 
      yPosition
    );
    yPosition += 15;
    
    // Section results
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('Detailed Results by Section', margin, yPosition);
    yPosition += 10;
    
    sectionKeys.forEach((sectionKey, index) => {
      const section = assessment.sections[sectionKey];
      const sectionScore = assessmentResult.sectionScores[sectionKey];
      
      // Add new page if needed
      if (index > 0 && yPosition > doc.internal.pageSize.getHeight() - 60) {
        doc.addPage();
        yPosition = 20;
      }
      
      // Section title
      doc.setFontSize(12);
      doc.setFont('helvetica', 'bold');
      doc.text(`${section.title}`, margin, yPosition);
      yPosition += 6;
      
      // Draw score bar graph
      drawProgressBar(
        doc,
        margin + 5,
        yPosition,
        120,
        sectionScore.score,
        sectionScore.maxScore
      );
      yPosition += 15;
      
      doc.setFontSize(10);
      doc.text(
        `${sectionScore.severityLabel} (${sectionScore.score}/${sectionScore.maxScore})`,
        margin + 5,
        yPosition
      );
      yPosition += 6;

      // Add questions and responses
      doc.setFontSize(9);
      section.questions.forEach((question: any) => {
        if (yPosition > doc.internal.pageSize.getHeight() - 40) {
          doc.addPage();
          yPosition = 20;
        }
        
        // Question text
        const questionText = `Q: ${question.text}`;
        const splitQuestion = doc.splitTextToSize(questionText, pageWidth - (margin * 2) - 15);
        doc.text(splitQuestion, margin + 10, yPosition);
        yPosition += splitQuestion.length * 5;
        
        // Answer
        const answer = assessment.answers[question.id] || 0;
        const answerText = `A: ${answerOptions[answer].label}`;
        doc.setFont('helvetica', 'italic');
        doc.text(answerText, margin + 10, yPosition);
        doc.setFont('helvetica', 'normal');
        yPosition += 8;
      });
      
      yPosition += 10;
    });
    
    // Footer
    const footerYPosition = doc.internal.pageSize.getHeight() - 10;
    doc.setFontSize(8);
    doc.setTextColor(100, 100, 100);
    doc.text(
      'This assessment is not a diagnostic tool. Please consult with a mental health professional if needed.',
      pageWidth / 2,
      footerYPosition,
      { align: 'center' }
    );
    
    // Save the PDF
    doc.save('zenvy-assessment-results.pdf');
  };

  return {
    assessmentResult,
    calculateResults,
    downloadResults
  };
};
