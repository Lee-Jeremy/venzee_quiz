const sinon = require('sinon');
const proxyquire = require('proxyquire');
const expect = require('chai').expect;

var fakeLoadNamespace;

describe('The ./lib/expandNamespaces function', () => {
  beforeEach(() => {
    fakeLoadNamespace = sinon.stub();
  })

  it('should keep paths without namespaces unchanged', () => {

    const expandNamespaces = proxyquire('../lib/expandNamespace', {
      './loadNamespaces': sinon.stub()
    });

    const expected = './somePath';
    const actual = expandNamespaces(expected);

    expect(actual).to.equal(expected);

  });

  it.skip('start writing tests here', () => {

  });

  it('should notify that the namespace does not exist with an error message', () => {
    const modulePath = '<someLib>/someModule';
    const callerPath = 'someModule';

    const expandNamespaces = proxyquire('../lib/expandNamespace', {
      './loadNamespaces': fakeLoadNamespace.returns({ namespaces: { otherLib: 'otherLib' } })
    });

    function getErrorMessage() {
      try {
        return expandNamespaces(modulePath, callerPath);
      } catch (e) {
        return e.message
      }
    }

    const expected = 'namespace <someLib> is not defined.';
    const actual = getErrorMessage();

    expect(actual).to.equal(expected)

  });

  it('should change a namespace into a valid path', () => {
    const modulePath = '<someLib>/someModule';
    const callerPath = 'someModule';

    const expandNamespaces = proxyquire('../lib/expandNamespace', {
      './loadNamespaces': fakeLoadNamespace.returns({ namespaces: { someLib: 'someLib' } })
    })

    const expected = '..\\someLib\\someModule';
    const actual = expandNamespaces(modulePath, callerPath);

    expect(actual).to.equal(expected)

  });

});
