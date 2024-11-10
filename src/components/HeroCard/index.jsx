
import "./index.css";

import ironImage from "/ironImage.png";
import bronzeImage from "/bronzeImage.jpg";
import silverImage from "/silverImage.jpg";
import goldImage from "/goldImage.jpg";
import platinumImage from "/platinumImage.jpg";
import ascendingImage from "/ascendingImage.jpg";
import immortalImage from "/immortalImage.jpg";
import radiantImage from "/radiantImage.jpg";

export default function HeroCard({ hero }) {

  const name = hero.name || "hero";
  const xp = hero.xp || 0;
  const level = hero.getLevel(hero.xp);
  const attack = hero.getAttack(hero.xp) || 0;
  const defense = hero.getDefense(hero.xp) || 0;

  const levelNames = ["iron", "bronze", "silver", "gold", "platinum", "ascending", "immortal", "radiant"];
  const heroImages = [ironImage, bronzeImage, silverImage, goldImage, platinumImage, ascendingImage, immortalImage, radiantImage];
  
  return (
    <div className="hero-card">
      <div className={`level ${ levelNames[level] }`}>{levelNames[level]}</div>
      <div className="card-container">
        <h4 className="card-title">{ name }</h4>
        <img src={ heroImages[level] } className="hero-image"></img>
        <div className="hero-info">
          <p>Attack: { attack }</p>
          <p>Defense: { defense }</p>
        </div>
      </div>
    </div>
  );
}
