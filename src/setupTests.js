// Jest setup and mocks
import '@testing-library/jest-dom';

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(() => null),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};
Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

// Mock browser APIs
window.scrollTo = jest.fn();

class ResizeObserverMock {
  observe() { }
  unobserve() { }
  disconnect() { }
}
window.ResizeObserver = ResizeObserverMock;
