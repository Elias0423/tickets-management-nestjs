import { Ticket } from './ticket.entity';

describe('Ticket', () => {
  it('should be defined', () => {
    expect(new Ticket()).toBeDefined();
  });
});
