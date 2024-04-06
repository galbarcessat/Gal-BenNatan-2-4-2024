
export function MenuToggle({ isMenuOpen, ToggleMenu }) {
    return (
        <div id="menuToggle"  >
            <input type="checkbox" checked={isMenuOpen} onChange={(event) => ToggleMenu(event.target.checked)} />
            <span></span>
            <span></span>
            <span></span>
            <ul id="menu">
            </ul>
        </div>
    )
}
