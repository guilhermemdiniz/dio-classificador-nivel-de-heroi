
import { useEffect, useRef, useState } from "react";
import XpIndicator from "../../components/XpIndicator";
import "./HeroPage.css";
import HeroCard from "../../components/HeroCard";

import { TiRefresh } from "react-icons/ti";
import { BiVolumeFull, BiVolumeMute } from "react-icons/bi";

// Level's audio imports
import audio0 from "../../assets/audios/level0.mp3";
import audio1 from "../../assets/audios/level1.mp3";
import audio2 from "../../assets/audios/level2.mp3";
import audio3 from "../../assets/audios/level3.mp3";
import audio4 from "../../assets/audios/level4.mp3";
import audio5 from "../../assets/audios/level5.mp3";
import audio6 from "../../assets/audios/level6.mp3";
import audio7 from "../../assets/audios/level7.mp3";

const levelAudios = [
  audio0,
  audio1,
  audio2,
  audio3,
  audio4,
  audio5,
  audio6,
  audio7,
];

// HERO object
const initialHero = {
  name: "Hero",
  xp: 0,
  level: -1,
  getLevel: (xp) => {
    if (xp < 0) return 0;
    if (xp <= 1000) return 0;
    if (xp <= 2000) return 1;
    if (xp <= 5000) return 2;
    if (xp <= 7000) return 3;
    if (xp <= 8000) return 4;
    if (xp <= 9000) return 5;
    if (xp <= 10000) return 6;
    return 7;
  },
  // Attack represents 57% of XP
  getAttack: (xp) => {
    if (xp <= 0) return 0;
    return parseInt(xp * 0.57);
  },
  // Defense represents 42% of XP
  getDefense: (xp) => {
    if (xp <= 0) return 0;
    return parseInt(xp * 0.43);
  },
};

export default function HeroPage() {
  const [hero, setHero] = useState(initialHero);
  const [decrementing, setDecrementing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [audioOff, setAutioOff] = useState(true);

  const longPressTimeout = useRef(null);
  const audioRefs = useRef([]);

  useEffect(() => {
    // Preload of all audios
    const preloadAllAudios = async () => {
      try {
        const promises = levelAudios.map((audioFile, index) => {
          return new Promise((resolve, reject) => {
            const audio = new Audio(audioFile);
            audio.loop = true;
            audio.preload = "auto"; 
            audioRefs.current[index] = audio; 
            audio.oncanplaythrough = resolve; 
            audio.onerror = () => reject(`Erro ao carregar o áudio: ${audioFile}`); // Rejeitar em caso de erro
          });
        });

        // Wait until all the audios are loaded
        await Promise.all(promises);
        setLoading(false);
      } catch (error) {
        console.error("Erro ao carregar os áudios:", error);
        setLoading(false);
      }
    };

    preloadAllAudios();
  }, []);

  const handlePressButton = () => {
    if (decrementing) {
      setDecrementing(false);
    }
    clearTimeout(longPressTimeout.current);
    longPressTimeout.current = setInterval(() => {
      xpIncrement();
    }, 40);
  };

  const handleLeaveButton = () => {
    setDecrementing(true);
    clearTimeout(longPressTimeout.current);
    if (hero.xp > 1) {
      longPressTimeout.current = setInterval(() => {
        xpDecrement();
      }, 60);
    }
  };

  // onClick Restart Button
  const handleRestart = () => {
    audioRefs.current[hero.level].pause();
    audioRefs.current[hero.level].currentTime=0;
    setHero(initialHero);
    audioRefs.current[0].play();
  }

  // onClick mute audio
  const handleMuteAudio = () => {
    setAutioOff(!audioOff);
  }

  function xpIncrement() {
    setHero((prevHero) => {
      const newXp = prevHero.xp + 10;
      return { ...prevHero, xp: newXp, level: prevHero.getLevel(newXp) };
    });
  }

  function xpDecrement() {
    setHero((prevHero) => {
      const newXp = prevHero.xp - 5;
      return { ...prevHero, xp: newXp, level: prevHero.getLevel(newXp) };
    });
  }

  // Stop decreasing XP Bar when it is at the minimum XP of its level
  useEffect(() => {
    const stopKeys = [1010, 2010, 5010, 7010, 8010, 9010, 10010];
    if (hero.xp === 0 && decrementing) {
      setDecrementing(false);
    }
    if (hero.xp <= 0 || (stopKeys.includes(hero.xp) && decrementing)) {
      clearTimeout(longPressTimeout.current);
    }
  }, [hero.xp, decrementing]);

  // play the audio when the level changes
  useEffect(() => {
    if (audioRefs.current[hero.level]) {
      if (hero.level > 0) {
        audioRefs.current[hero.level - 1].pause();
        audioRefs.current[hero.level - 1].currentTime=0;
      }
      audioRefs.current[hero.level].play();
    }
  }, [hero.level]);

  // mute all of the audios whe user chooses to mute the page
  useEffect(() => {
    audioRefs.current.forEach((audio) => {
      audio.muted = audioOff;
    });
  }, [audioOff]);


  if (loading) {
    return (
      <div className="loading-screen">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div 
      className={`main ${hero.level === 6 && "bg-immortal"}
                       ${hero.level === 7 && "bg-radiant"}`}>
      <section className="card-section">
        <HeroCard hero={hero} />
        <div>
          <p 
            className={`${(!decrementing && hero.xp > 10) && "shake"} xp-text`}>
              XP: {hero.xp}
          </p>
          <XpIndicator xp={hero.xp} level={hero.getLevel(hero.xp)} small />
        </div>
      </section>
      <div className="buttons">
        <button 
          className="audio-option"
          onClick={handleMuteAudio}
        >
          { audioOff ? <BiVolumeMute size={32} /> : <BiVolumeFull size={32} /> }
        </button>
        <button 
          className="press-button"
          onMouseDown={handlePressButton} 
          onMouseUp={handleLeaveButton}
        >
          PRESS ME  
        </button>
        <button 
          className="restart"
          onClick={handleRestart}
        >
          <TiRefresh size={40} />
        </button>
      </div>
    </div>
  );
}
