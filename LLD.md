# Low-Level Design (LLD) — iPhone-Style Calculator


## Goal
Provide a small, reusable, and maintainable calculator app with:
- Clean separation between UI (HTML/CSS) and logic (JS)
- Reusable helper functions for computation and feedback
- Lightweight feedback for mobile (vibration) and PC (visual)


## File Structure
- `index.html` — minimal markup, semantic and accessible
- `styles.css` — all visual styling, responsive rules, and haptic visual classes
- `app.js` — all logic: input parsing, computation, feedback, event handling


## Modules / Responsibilities
- **DOM layer (index.html)**: Provides semantic markup and `data-` attributes for each button. Keeps HTML free of logic.
- **Styling layer (styles.css)**: Visual theme, responsive adjustments, and PC haptic classes are here so JS only toggles classes.
- **Logic layer (app.js)**:
- **Utilities**: `sanitizeForEval`, `compute`, `isOperatorButton` — isolated and testable.
- **Handlers**: `handleInput`, `handleClear`, `handleEquals`, `handlePlusMinus`, `handlePercent`.
- **Feedback**: `playFeedback` encapsulates audio, vibration and visual effects.
- **Event delegation**: Single listener on `.keys` to keep DOM manipulation minimal and scalable.


## Reusability
- Use small utility functions that can be imported into other modules or unit-tested separately.
- `data-value` and `data-action` attributes decouple markup from behaviour — easy to add/remove buttons.
- The feedback function accepts the `button` element, so different UIs can reuse the same function.


## Scalability
- The single event delegation pattern (`keysEl.addEventListener`) scales to many buttons without per-button listeners.
- To add scientific functions, add new `data-action` types and handler functions (e.g. `sin`, `log`) — no change to core wiring.
- Supporting themes: move color variables to CSS `:root` and toggle classes on `.calculator`.


## Maintainability
- Keep pure functions for computation (easier unit testing).
- Avoid inline JS — keeps HTML clean.
- All constants (durations, CSS class names) are centralized at top of `app.js`.
- Use clear naming: `handleX`, `compute`, `sanitizeForEval`.
- To debug, add logging in utility functions only.


## Accessibility
- `aria-live="polite"` on the display to announce updates for screen readers.
- Buttons are real `<button>` elements and focusable.
- Keyboard support implemented for main operations.


## Performance & Security
- Computation uses `Function(...)()` for expression evaluation. For untrusted inputs or public deployments consider replacing with a proper expression parser (mathjs or a custom parser) to avoid executing arbitrary code.
- Audio is preloaded; play promise is handled with `.catch()` to avoid uncaught rejections.


## Testing
- Unit test utilities: `sanitizeForEval`, `compute` (with a safe test harness), `isOperatorButton`.
- Integration test: simulate clicks and key events—assert display updates.


## Extending
- **Theme system**: add `data-theme` attribute and CSS variables for colors.
- **History log**: store expression/result pairs in `localStorage` and add a panel.
- **Scientific mode**: switch layout using CSS grid variants and add handlers for new actions.


## Notes
- Keep feedback short to avoid interfering with rapid input.
- When deploying, host the click audio locally and consider user settings to mute sound.
