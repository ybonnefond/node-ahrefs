describe('Request', function () {
  var Request = require('../lib/Request');
  var rules = require('../lib/rules');

  var req;

  beforeEach(function(){ req = new Request('ahrefs.com'); });

  it('should throw an Error if target not set', function () {
    expect(function(){
      new Request();
    }).toThrow();
  });

  it('should initialize the request', function () {
    expect(req.mode).toEqual('exact');
    expect(req.params).toEqual({});
    expect(req.oriParams).toEqual({
      'where': [],
      'having': []
    });
    expect(req.isPrepare).toEqual(false);
  });

  describe('wrapValue', function(){
    it('should add quote and backslashes to a quoted type', function(){

      rules.quotedValue.forEach(function(type){
        var t = req.wrapValue("This 'quoted' text", type);
        expect(t).toEqual('"This \\\'quoted\\\' text"');
      });

    });

    it('should wrap a string', function(){
      var t = req.wrapValue("This 'quoted' text", 'url');
      expect(t).toEqual('"This \\\'quoted\\\' text"');
    });

    it('should wrap a date', function(){
      var t = req.wrapValue("This 'quoted' text", 'first_seen');
      expect(t).toEqual('"This \\\'quoted\\\' text"');
    });

    it('should wrap a int', function(){
      var t = req.wrapValue(12, 'ahrefs_rank');
      expect(t).toEqual(12);
    });

    it('should wrap a boolean', function(){
      var t = req.wrapValue(true, 'sitewide');
      expect(t).toEqual('true');
      var t = req.wrapValue(false, 'sitewide');
      expect(t).toEqual('false');
    });

  });

  describe('quote', function(){
    it('should add quote and backslashes to a quoted type', function(){
      expect(req.quote('Unquoted text')).toEqual("\"Unquoted text\"");
      expect(req.quote("This 'quoted' text")).toEqual('"This \\\'quoted\\\' text"');
      expect(req.quote('This "quoted" text')).toEqual("\"This \\\"quoted\\\" text\"");
    });
  });

});
