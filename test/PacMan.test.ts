import PacMan from '../src/pacman-core/PacMan';

test('basic', () => {
    const pacman = new PacMan();
    expect(pacman.whatAmILike()).toBe('funny');
});