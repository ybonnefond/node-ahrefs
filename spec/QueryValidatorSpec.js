var conf = require('./support/conf');

describe('QueryBuilder', function () {
  var validator = require('../lib/QueryValidator');
  var rules = require('../lib/rules');

  it('should checkMandatories', function () {
    // Missing parameters
    expect(function(){
      validator.checkMandatories({
        params: {}
      })
    }).toThrow();

    // Empty parameters
    expect(function(){
      validator.checkMandatories({
        params: {
          "token": '', "from":'', "target":'', "mode":''
        }
      })
    }).toThrow();

    // All good
    expect(function(){
      validator.checkMandatories({
        params: {
          "token": 'a', "from":'a', "target":'a', "mode":'a'
        }
      })
    }).not.toThrow();
  });

  it('should check if column exists', function () {

    expect(validator._columnExists({
      params: {
        from: 'ahrefs_rank'
      }
    }, 'url')).toBeTruthy();

    expect(validator._columnExists({
      params: {
        from: 'ahrefs_rank'
      }
    }, 'test')).toBeFalsy();
  });

  it('should check select param', function () {

    expect(function(){
      validator.checkSelect({
        params: {
          from: 'ahrefs_rank'
        }
      })
    }).not.toThrow();

    expect(function(){
      validator.checkSelect({
        params: {
          from: 'ahrefs_rank',
          select: ['url', 'ahrefs_rank']
        }
      })
    }).not.toThrow();

    expect(function(){
      validator.checkSelect({
        params: {
          from: 'ahrefs_rank',
          select: ['url', 'ahrefs_rank', 'test']
        }
      })
    }).toThrow();
  });


  it('should check checkCondition param', function () {

    expect(function(){
      validator.checkCondition('where', {
        params: {
          from: 'ahrefs_rank'
        }
      })
    }).not.toThrow();

    expect(function(){
      validator.checkCondition('where', {
        params: {
          from: 'ahrefs_rank',
          where: [
            ['substring', 'url', 'ahref']
          ]
        }
      })
    }).not.toThrow();

    expect(function(){
      validator.checkCondition('where', {
        params: {
          from: 'ahrefs_rank',
          where: [
            ['gte', 'ahrefs_rank', 1]
          ]
        }
      })
    }).toThrow();

    expect(function(){
      validator.checkCondition('having', {
        params: {
          from: 'anchors',
          having: [
            ['substring', 'refdomain', '.com']
          ]
        }
      })
    }).toThrow();
  });

});
