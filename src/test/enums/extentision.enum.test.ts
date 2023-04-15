// Import the enum from the code file
import { Extensions } from '../../enums/extension.enum';

describe('Extensions Enum', () => {
  it('should have correct values', () => {
    expect(Extensions.contact).toEqual('@c.us');
    expect(Extensions.group).toEqual('@g.us');
    expect(Extensions.status).toEqual('status@broadcast');
  });

  it('should not have additional properties', () => {
    const enumKeys = Object.keys(Extensions);
    const expectedEnumKeys = ['contact', 'group', 'status'];

    expect(enumKeys).toEqual(expectedEnumKeys);
  });

  it('should not be modified', () => {
    expect(Extensions.contact).toEqual('@c.us');
  });
});
