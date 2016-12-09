var expect = require('expect');
var {generateMessage} = require('./message');

describe('generate messsage', () => {
  it('should generate correct message object', () => {
    //store res in variable
    var from  = 'Jen';
    var text = 'some message';
    var message = generateMessage(from, text);

    expect(message.createdAt).toBeA('number');
    expect(message).toInclude({
      from,
      text
    });
  });
});
