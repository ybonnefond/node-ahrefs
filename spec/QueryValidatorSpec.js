var conf = require('./support/conf');

describe('QueryValidator', function () {
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

    expect(function(){
      validator.checkMandatories({
        params: {
          "token": 'a', "from":'a', "target":'a', "mode":'domain'
        }
      })
    }).not.toThrow();

    expect(function(){
      validator.checkMandatories({
        params: {
          "token": 'a', "from":'subscription_info'
        }
      })
    }).not.toThrow();

    expect(function(){
      validator.checkMandatories({
        params: {
          "token": 'a', "from":'a', 'target': 'a', 'mode': 'test'
        }
      })
    }).toThrow();
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

  it('should check orderBy param', function () {

    expect(function(){
      validator.checkOrderBy({
        params: {
          from: 'ahrefs_rank'
        }
      })
    }).not.toThrow();

    expect(function(){
      validator.checkOrderBy({
        params: {
          from: 'ahrefs_rank',
          order_by: ['url', 'ahrefs_rank']
        }
      })
    }).not.toThrow();

    expect(function(){
      validator.checkOrderBy({
        params: {
          from: 'ahrefs_rank',
          order_by: ['url', 'ahrefs_rank', 'test']
        }
      })
    }).toThrow();

    expect(function(){
      validator.checkOrderBy({
        params: {
          from: 'ahrefs_rank',
          order_by: ['ahrefs_rank:desc']
        }
      })
    }).not.toThrow();

    expect(function(){
      validator.checkOrderBy({
        params: {
          from: 'ahrefs_rank',
          order_by: ['ahrefs_rank:test']
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
