/** Clip shapes for the photo panel of the home hero and the page headers: the slanted, rounded-foot panel on desktop
 *  and a slanted top edge on narrow screens. Rendered once per page. */
export function HeroClipDefs() {
  return (
    <svg className="ag-hero__defs" width="0" height="0" aria-hidden="true" focusable="false">
      <clipPath id="ag-hero-clip" clipPathUnits="objectBoundingBox"><path d="M0.42 0 L1 0 L1 0.97 L0.14 0.855 Q0.03 0.84 0.045 0.73 Z" /></clipPath>
      <clipPath id="ag-hero-clip-m" clipPathUnits="objectBoundingBox"><path d="M0 0.2 L1 0 L1 1 L0 1 Z" /></clipPath>
    </svg>
  )
}
