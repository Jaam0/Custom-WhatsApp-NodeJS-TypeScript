import { theTime } from '../../utils/others.handle';

describe('theTime function', () => {
  test('should return "Morning" between 00:00 and 11:59', () => {
    // Mocking the current time to be 9:30 AM
    jest.spyOn(Date.prototype, 'getHours').mockReturnValueOnce(9);
    jest.spyOn(Date.prototype, 'getMinutes').mockReturnValueOnce(30);

    expect(theTime()).toBe('Morning');
  });

  test('should return "Afternoon" between 12:00 and 18:59', () => {
    // Mocking the current time to be 3:45 PM
    jest.spyOn(Date.prototype, 'getHours').mockReturnValueOnce(15);
    jest.spyOn(Date.prototype, 'getMinutes').mockReturnValueOnce(45);

    expect(theTime()).toBe('Afternoon');
  });

  test('should return "Night" between 19:00 and 23:59', () => {
    // Mocking the current time to be 10:20 PM
    jest.spyOn(Date.prototype, 'getHours').mockReturnValueOnce(22);
    jest.spyOn(Date.prototype, 'getMinutes').mockReturnValueOnce(20);

    expect(theTime()).toBe('Night');
  });
});