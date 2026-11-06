/**
 * Minimal intro screen shown once per browser session on the first full page load.
 * Pure CSS: it animates in, then fades itself out, so it never blocks rendering.
 * `splashScript` (inlined in <head>) hides it immediately on later loads in the same session.
 */
export const splashScript = `try{if(sessionStorage.getItem('sny-splash')){document.documentElement.setAttribute('data-splash-seen','')}else{sessionStorage.setItem('sny-splash','1')}}catch(e){}`;

export default function Splash() {
  return (
    <div className="splash" aria-hidden="true">
      <div className="splash-inner">
        <span className="splash-mark">
          <span className="splash-roof" />
          <span className="splash-sun" />
          <span className="splash-base" />
        </span>
        <span className="splash-word">
          school<span className="serif">near</span>you
        </span>
        <span className="splash-tag serif">Big beginnings start here.</span>
        <span className="splash-bar"><span /></span>
      </div>
    </div>
  );
}
