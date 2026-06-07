/** Small global UI state shared across the shell (command palette visibility). */
class CommandPaletteState {
	open = $state(false);
	toggle(): void {
		this.open = !this.open;
	}
	show(): void {
		this.open = true;
	}
	hide(): void {
		this.open = false;
	}
}

export const commandPalette = new CommandPaletteState();
