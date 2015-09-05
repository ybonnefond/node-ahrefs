describe('UrlEncoder', function () {
  var conf = require('./support/conf')
  var ahrefs = require('../lib/Ahrefs')({
    token: conf.token
  });

  it('should get an error if token is incorrect', function (done) {
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

  it('should get a validation error', function (done) {
    var query = ahrefs.newQuery()
      .target(conf.target)
      .mode('domain')
      .from('test')
      .limit(10);
    ahrefs.get(query, function(err, result){
      expect(err instanceof ahrefs.ValidationError).toEqual(true);
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

  it('should post a query and get a json result', function (done) {
    var query = ahrefs.newQuery()
      .target(conf.target)
      .mode('domain')
      .from('ahrefs_rank')
      .limit(10);
    ahrefs.post(query, function(err, result){
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

  it('should execute a big query', function (done) {
    var query = ahrefs.newQuery()
      .target(conf.target)
      .mode('domain') // Mode of operation: exact, domain, subdomains or prefix
      .select('anchor', 'backlinks') // List of columns to select (can be set multiple times)
      .from('anchors') // Table to select data from:  https://ahrefs.com/api/documentation/anchors
      .where('lt', 'backlinks', 10) // "Where" condition to satisfy, Less than 10 backlinks
      .where('lt', 'refpages', 5) // Can set multiple where clause
      .having('word', 'anchor', 'link') // Having the word `link` in anchor text
      .orderBy('first_seen', 'last_visited:desc') // ordering first by first_seen ascending, then by last_visited descending. Can be set multiple times
      .limit(10) // return 10 rows
      .offset(5); // from row 5
    ahrefs.get(query, function(err, result){
      expect(err).toBeNull();
      done();
    });
  });


});
