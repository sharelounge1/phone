import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Design0 } from './components/designs/Design0';
import { Design1 } from './components/designs/Design1';
import { Design2 } from './components/designs/Design2';
import { Design3 } from './components/designs/Design3';
import { Design4 } from './components/designs/Design4';
import { Design5 } from './components/designs/Design5';

function App() {
  const [currentDesign, setCurrentDesign] = useState(0);

  const designs = [
    { id: 0, name: 'Original Design', component: <Design0 /> },
    { id: 1, name: 'Tinder Style', component: <Design1 /> },
    { id: 2, name: 'Stories Style', component: <Design2 /> },
    { id: 3, name: 'Gaming Style', component: <Design3 /> },
    { id: 4, name: 'Bumble Style', component: <Design4 /> },
    { id: 5, name: 'Minimal Style', component: <Design5 /> },
  ];

  const handlePrev = () => {
    setCurrentDesign(prev => prev === 0 ? 5 : prev - 1);
  };

  const handleNext = () => {
    setCurrentDesign(prev => prev === 5 ? 0 : prev + 1);
  };

  const currentDesignData = designs.find(d => d.id === currentDesign);

  return (
    <div className="relative">
      {/* Navigation Controls */}
      <div className="fixed top-1/2 left-0 right-0 z-[9999] pointer-events-none">
        <div className="max-w-screen-2xl mx-auto px-4 flex justify-between items-center">
          {/* Previous Button */}
          <button
            onClick={handlePrev}
            className="pointer-events-auto bg-white/90 hover:bg-white text-gray-900 p-4 rounded-full shadow-2xl transition-all hover:scale-110"
          >
            <ChevronLeft className="w-8 h-8" />
          </button>

          {/* Next Button */}
          <button
            onClick={handleNext}
            className="pointer-events-auto bg-white/90 hover:bg-white text-gray-900 p-4 rounded-full shadow-2xl transition-all hover:scale-110"
          >
            <ChevronRight className="w-8 h-8" />
          </button>
        </div>
      </div>

      {/* Design Indicator */}
      <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-[9999] bg-black/80 backdrop-blur-sm text-white px-6 py-3 rounded-full shadow-2xl">
        <div className="text-center">
          <div className="text-sm font-bold">{currentDesign === 0 ? 'Original' : `Design ${currentDesign}`} / 6개</div>
          <div className="text-xs text-gray-300">{currentDesignData?.name}</div>
        </div>
      </div>

      {/* Design Dots */}
      <div className="fixed bottom-24 left-1/2 transform -translate-x-1/2 z-[9999] flex gap-2">
        {designs.map((design) => (
          <button
            key={design.id}
            onClick={() => setCurrentDesign(design.id)}
            className={`w-3 h-3 rounded-full transition-all ${
              currentDesign === design.id
                ? 'bg-white scale-125'
                : 'bg-white/50 hover:bg-white/70'
            }`}
          />
        ))}
      </div>

      {/* Current Design */}
      <div className="w-full h-full">
        {currentDesignData?.component}
      </div>
    </div>
  );
}

export default App;
