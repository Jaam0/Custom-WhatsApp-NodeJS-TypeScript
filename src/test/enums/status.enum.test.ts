import { Status } from '../../enums/status.enum';

describe('Status', () => {
  it('should have correct values', () => {
    expect(Status.Active).toEqual('Active');
    expect(Status.Disable).toEqual('Disable');
  });
});
