describe('UrlEncoder', function () {
  var conf = require('./support/conf')
  var ahrefs = require('../lib/Ahrefs')({
    token: conf.token
  });

  it('should get an error', function (done) {
    var query = ahrefs.newQuery()
      .token('111')
      .target(conf.target)
      .mode('domain')
      .from('ahrefs_rank')
      .limit(10);
    ahrefs.get(query, function(err, result){
      expect(err).not.toBeNull();
      done();
    });
  });

  it('should execute query and get a json result', function (done) {
    var query = ahrefs.newQuery()
      .target(conf.target)
      .mode('domain')
      .from('ahrefs_rank')
      .limit(10);
    ahrefs.get(query, function(err, result){
      expect(err).toBeNull();
      expect(result.pages).toBeDefined();
      expect(result.pages.length).toEqual(10);
      done();
    });
  });

  it('should execute query and get an xml result', function (done) {
    var query = ahrefs.newQuery()
      .target(conf.target)
      .mode('domain')
      .from('ahrefs_rank')
      .limit(10)
      .output('xml');
    ahrefs.get(query, function(err, result){
      expect(err).toBeNull();
      expect(result).toBeDefined();
      done();
    });
  });

  it('should execute an xml query and get an error', function (done) {
    var query = ahrefs.newQuery()
      .token('123')
      .target(conf.target)
      .mode('domain')
      .from('ahrefs_rank')
      .limit(10)
      .output('xml');
    ahrefs.get(query, function(err, result){
      expect(err).not.toBeNull();
      done();
    });
  });
});
