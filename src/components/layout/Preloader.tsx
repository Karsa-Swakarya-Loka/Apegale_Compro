// Brand preloader for full document loads (first visit, refresh): the Ape Gale mark and the "apegale" wordmark,
// whose maroon fill sweeps across the letters in place of a progress bar. Client-side navigations never show it
// because the node lives in the root layout and is dismissed once.
//
// Load balancer (keeps performance stable, see design/README.md):
// - CSS only (opacity, clip-path, transform); the inline script is well under 1 KB and runs before hydration.
// - Minimum 900 ms so the sweep completes once without flicker; hard cap 2.4 s so a slow network, a blocked
//   third-party request or a script error can never leave the page covered.
// - Skipped entirely with prefers-reduced-motion, Save-Data, and back/forward navigations (bfcache restores
//   are dismissed on pageshow). Without JavaScript the overlay is not displayed at all.
// - Dispatches "ag:preloaded" so the hero waits and starts its entrance when the page is actually visible.
import Image from 'next/image'

const script = `(function(){var d=document.documentElement,el=document.getElementById('ag-preloader');if(!el)return;
var c=navigator.connection,nav=performance.getEntriesByType&&performance.getEntriesByType('navigation')[0];
var skip=matchMedia('(prefers-reduced-motion: reduce)').matches||(c&&c.saveData)||(nav&&nav.type==='back_forward');
var MIN=900,MAX=2400,t0=performance.now(),finished=false;
function done(wait){if(finished)return;finished=true;setTimeout(function(){el.setAttribute('data-state','done');d.removeAttribute('data-preloading');
window.dispatchEvent(new Event('ag:preloaded'));setTimeout(function(){el.setAttribute('hidden','')},500)},wait)}
if(skip){el.setAttribute('hidden','');done(0);return}
d.setAttribute('data-preloading','');
function onLoad(){done(Math.max(0,MIN-(performance.now()-t0)))}
if(document.readyState==='complete')onLoad();else window.addEventListener('load',onLoad,{once:true});
setTimeout(function(){done(0)},MAX);
window.addEventListener('pageshow',function(e){if(e.persisted)done(0)});})();`

export function Preloader() {
  return (
    <>
      <div id="ag-preloader" className="ag-preloader" aria-hidden="true" suppressHydrationWarning>
        <div className="ag-preloader__in">
          <Image className="ag-preloader__mark" src="/brand/apegale-mark.png" alt="" width={140} height={134} priority />
          <span className="ag-preloader__word" data-text="apegale">apegale</span>
        </div>
      </div>
      <script dangerouslySetInnerHTML={{ __html: script }} />
    </>
  )
}
