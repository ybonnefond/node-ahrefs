describe('UrlEncoder', function () {
  var conf = require('./support/conf');
  var encoder = require('../lib/UrlEncoder');
  var rules = require('../lib/rules');
  var query;


  it('should encode array', function () {
    expect(encoder.encodeArray(['date', 'time'])).toEqual('date,time');
  });

  it('should encode some conditions', function () {
    expect(encoder.encodeCondition([
      ['gt', 'ahrefs_rank', 10],
      ['substring', 'url_from', 'test']
    ]))
    .toEqual('ahrefs_rank>10,substring(url_from,"test")');
  });

  describe('_wrapValue', function(){
    it('should add quote and backslashes to a quoted type', function(){

      rules.quotedValue.forEach(function(type){
        var t = encoder._wrapValue("This 'quoted' text", type);
        expect(t).toEqual('"This \\\'quoted\\\' text"');
      });

    });

    it('should wrap a string', function(){
      var t = encoder._wrapValue("This 'quoted' text", 'url');
      expect(t).toEqual('"This \\\'quoted\\\' text"');
    });

    it('should wrap a date', function(){
      var t = encoder._wrapValue("This 'quoted' text", 'first_seen');
      expect(t).toEqual('"This \\\'quoted\\\' text"');
    });

    it('should wrap a int', function(){
      var t = encoder._wrapValue(12, 'ahrefs_rank');
      expect(t).toEqual(12);
    });

    it('should wrap a boolean', function(){
      var t = encoder._wrapValue(true, 'sitewide');
      expect(t).toEqual('true');
      var t = encoder._wrapValue(false, 'sitewide');
      expect(t).toEqual('false');
    });

  });

  describe('quote', function(){
    it('should add quote and backslashes to a quoted type', function(){
      expect(encoder._quote('Unquoted text')).toEqual("\"Unquoted text\"");
      expect(encoder._quote("This 'quoted' text")).toEqual('"This \\\'quoted\\\' text"');
      expect(encoder._quote('This "quoted" text')).toEqual("\"This \\\"quoted\\\" text\"");
    });
  });

  describe('_buildCondition', function(){
    it('should build an operator based condition', function(){
      var cond = encoder._buildCondition(['gt', 'ahrefs_rank', 10]);
      expect(cond).toEqual('ahrefs_rank>10');
    });
    it('should build a non operator based condition', function(){
      var cond = encoder._buildCondition(['substring', 'url_from', 'test']);
      expect(cond).toEqual('substring(url_from,\"test\")');
    });
  });



  describe('encodeParams', function(){
    it('should not encode empty parameters', function(){
      var cond = encoder.encodeParams({
        limit: 10,
        offset: 20
      });
      expect(cond).toEqual('limit=10&offset=20');
    });
    it('should encode multiple parameters', function(){
      var cond = encoder.encodeParams({
        'select': ['date', 'time'],
        'order_by': ['date', 'time'],
        'where': [
          ['gt', 'ahrefs_rank', 10],
          ['lte', 'ahrefs_rank', 25]
        ],
        'having': [
          ['substring', 'url_from', 'test']
        ],
        limit: 10,
        offset: 20
      });
      expect(cond).toEqual('select=date%2Ctime&order_by=date%2Ctime&where=ahrefs_rank%3E10%2Cahrefs_rank%3C%3D25&having=substring(url_from%2C%22test%22)&limit=10&offset=20');
    });
  });

});
