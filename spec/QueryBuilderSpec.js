var conf = require('./support/conf');

describe('QueryBuilder', function () {
  var QueryBuilder = require('../lib/QueryBuilder');
  var rules = require('../lib/rules');

  var query;

  beforeEach(function(){ query = new QueryBuilder(conf.target); });

  it('should initialize the query', function () {
    expect(query.params.mode).toEqual('exact');
    expect(query.params.output).toEqual('json');
  });

  describe('_wrapValue', function(){
    it('should add quote and backslashes to a quoted type', function(){

      rules.quotedValue.forEach(function(type){
        var t = query._wrapValue("This 'quoted' text", type);
        expect(t).toEqual('"This \\\'quoted\\\' text"');
      });

    });

    it('should wrap a string', function(){
      var t = query._wrapValue("This 'quoted' text", 'url');
      expect(t).toEqual('"This \\\'quoted\\\' text"');
    });

    it('should wrap a date', function(){
      var t = query._wrapValue("This 'quoted' text", 'first_seen');
      expect(t).toEqual('"This \\\'quoted\\\' text"');
    });

    it('should wrap a int', function(){
      var t = query._wrapValue(12, 'ahrefs_rank');
      expect(t).toEqual(12);
    });

    it('should wrap a boolean', function(){
      var t = query._wrapValue(true, 'sitewide');
      expect(t).toEqual('true');
      var t = query._wrapValue(false, 'sitewide');
      expect(t).toEqual('false');
    });

  });

  describe('quote', function(){
    it('should add quote and backslashes to a quoted type', function(){
      expect(query._quote('Unquoted text')).toEqual("\"Unquoted text\"");
      expect(query._quote("This 'quoted' text")).toEqual('"This \\\'quoted\\\' text"');
      expect(query._quote('This "quoted" text')).toEqual("\"This \\\"quoted\\\" text\"");
    });
  });

  describe('setParam', function(){
    it('should set a param that does not exist', function(){
      query.setParam('limit', 10);
      expect(query.params.limit).toEqual(10);
    });
    it('should happen to an existing param', function(){
      query.setParam('where', 'hello');
      query.setParam('where', 'world');
      expect(query.params.where).toEqual(['hello','world']);
    });
  });

  describe('set', function(){
    it('should throw an Error if unknown param', function(){
      expect(function(){
        query.setParam('test', 'test')
      }).toThrow();
    });
    it('should set a limit', function(){
      query.limit(10);
      expect(query.params.limit).toEqual(10);
    });
    it('should set offset', function(){
      query.offset(10);
      expect(query.params.offset).toEqual(10);
    });
    it('should set a target', function(){
      query.target('ahrefs.com');
      expect(query.params.target).toEqual('ahrefs.com');
    });
    it('should set the output to XML', function(){
      query.output('xml');
      expect(query.params.output).toEqual('xml');
    });
  });

  describe('_buildCondition', function(){
    it('should build an operator based condition', function(){
      var cond = query._buildCondition('gt', 'ahrefs_rank', 10);
      expect(cond).toEqual('ahrefs_rank>10');
    });
    it('should build a non operator based condition', function(){
      var cond = query._buildCondition('substring', 'url_from', 'test');
      expect(cond).toEqual('substring(url_from,\"test\")');
    });
  });

  describe('select', function(){
    it('should select using parameters', function(){
      query.select('test', 'test2', 'test3');
      expect(query.params.select).toEqual(['test','test2','test3']);
    });
    it('should select using an array', function(){
      query.select(['test', 'test2', 'test3']);
      expect(query.params.select).toEqual(['test','test2','test3']);
    });
    it('should select using a string', function(){
      query.select('test');
      expect(query.params.select).toEqual(['test']);
    });
    it('should append multiple select calls', function(){
      query
        .select('date', 'type')
        .select(['refdomain','domain_rating']);
      expect(query.params.select).toEqual(['date','type','refdomain','domain_rating']);
    });
  });

  describe('order', function(){
    it('should order by using parameters', function(){
      query.select('domain_rating:desc','refdomain');
      expect(query.params.select).toEqual(['domain_rating:desc','refdomain']);
    });
    it('should order by using an array', function(){
      query.select(['domain_rating:desc','refdomain']);
      expect(query.params.select).toEqual(['domain_rating:desc','refdomain']);
    });
    it('should order by using a string', function(){
      query.select('domain_rating:desc');
      expect(query.params.select).toEqual(['domain_rating:desc']);
    });
    it('should append multiple order by calls', function(){
      query
        .select('domain_rating:desc','refdomain')
        .select(['date:desc','type']);
      expect(query.params.select).toEqual(['domain_rating:desc','refdomain','date:desc','type']);
    });
  });

});
