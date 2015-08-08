describe('Query', function () {
  var conf = require('./support/conf');
  var Query = require('../lib/Query');
  var rules = require('../lib/rules');
  var query;

  beforeEach(function(){ query = new Query(conf.target); });

  it('should initialize the query', function () {
    expect(query.params.mode).toEqual('exact');
    expect(query.params.output).toEqual('json');
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
    it('should set the mode', function(){
      query.mode('domain');
      expect(query.params.mode).toEqual('domain');
    });
    it('should set the from table parameter', function(){
      query.from('anchors');
      expect(query.params.from).toEqual('anchors');
    });
    it('should set the token parameter', function(){
      query.token('123456');
      expect(query.params.token).toEqual('123456');
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

  describe('orderBy', function(){
    it('should order by using parameters', function(){
      query.orderBy('domain_rating:desc','refdomain');
      expect(query.params.order_by).toEqual(['domain_rating:desc','refdomain']);
    });
    it('should order by using an array', function(){
      query.orderBy(['domain_rating:desc','refdomain']);
      expect(query.params.order_by).toEqual(['domain_rating:desc','refdomain']);
    });
    it('should order by using a string', function(){
      query.orderBy('domain_rating:desc');
      expect(query.params.order_by).toEqual(['domain_rating:desc']);
    });
    it('should append multiple order by calls', function(){
      query
        .orderBy('domain_rating:desc','refdomain')
        .orderBy(['date:desc','type']);
      expect(query.params.order_by).toEqual(['domain_rating:desc','refdomain','date:desc','type']);
    });
  });


  describe('where', function(){
    it('should add a where parameter', function(){
      query.where('lt', 'anchor', 1);
      expect(query.params.where.length).toEqual(1);
    });
    it('should append multiple order by calls', function(){
        query.where('lt', 'anchor', 1);
        query.where('lt', 'anchor', 1);
        expect(query.params.where.length).toEqual(2);
    });
  });


  describe('having', function(){
    it('should add a where parameter', function(){
      query.having('lt', 'anchor', 1);
      expect(query.params.having.length).toEqual(1);
    });
    it('should append multiple order by calls', function(){
        query.having('lt', 'anchor', 1);
        query.having('lt', 'anchor', 1);
        expect(query.params.having.length).toEqual(2);
    });
  });
});
