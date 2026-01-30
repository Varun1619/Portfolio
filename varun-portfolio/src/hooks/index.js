import { useState, useEffect, useCallback, useRef } from 'react';
import { rawSourceData } from '../data/sampleData';
import { transformData, filterValidRecords } from '../utils/transformations';

// Hook to track scroll position
export function useScrollPosition() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return scrollY;
}

// Hook for intersection observer (section visibility)
export function useIntersectionObserver(options = {}) {
  const [visibleSections, setVisibleSections] = useState({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => ({
              ...prev,
              [entry.target.id]: true,
            }));
          }
        });
      },
      { threshold: 0.1, ...options }
    );

    document.querySelectorAll('section[id]').forEach((section) => {
      observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  return visibleSections;
}

// Hook to manage ETL pipeline state
export function useETLPipeline() {
  const [pipelineStage, setPipelineStage] = useState(0);
  const [extractedData, setExtractedData] = useState([]);
  const [transformedData, setTransformedData] = useState([]);
  const [loadedData, setLoadedData] = useState([]);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleExtract = useCallback(async () => {
    if (isAnimating || pipelineStage !== 0) return;
    
    setIsAnimating(true);
    await new Promise((r) => setTimeout(r, 800));
    setExtractedData(rawSourceData);
    setPipelineStage(1);
    setIsAnimating(false);
  }, [isAnimating, pipelineStage]);

  const handleTransform = useCallback(async () => {
    if (isAnimating || pipelineStage !== 1) return;
    
    setIsAnimating(true);
    await new Promise((r) => setTimeout(r, 1000));
    const cleaned = transformData(extractedData);
    setTransformedData(cleaned);
    setPipelineStage(2);
    setIsAnimating(false);
  }, [isAnimating, pipelineStage, extractedData]);

  const handleLoad = useCallback(async () => {
    if (isAnimating || pipelineStage !== 2) return;
    
    setIsAnimating(true);
    await new Promise((r) => setTimeout(r, 800));
    const validRecords = filterValidRecords(transformedData);
    setLoadedData(validRecords);
    setPipelineStage(3);
    setIsAnimating(false);
  }, [isAnimating, pipelineStage, transformedData]);

  const resetPipeline = useCallback(() => {
    setPipelineStage(0);
    setExtractedData([]);
    setTransformedData([]);
    setLoadedData([]);
  }, []);

  return {
    pipelineStage,
    extractedData,
    transformedData,
    loadedData,
    isAnimating,
    handleExtract,
    handleTransform,
    handleLoad,
    resetPipeline,
    rawData: rawSourceData,
  };
}

// Hook for preloader
export function usePreloader(delay = 100) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return loaded;
}