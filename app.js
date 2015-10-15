var request = require("request")
var homeworks = [
  'https://github.com/ga-dc/html_resume',
  'https://github.com/ga-dc/kitchen_organizer',
  'https://github.com/ga-dc/curriculum/issues',
  'https://github.com/ga-dc/hippy-portfolio',
  'https://github.com/ga-dc/choose_your_own_adventure_js',
  'https://github.com/ga-dc/js-calculator'
]

var students = [{"id":1,"github":"adambray"},{"id":39,"github":"starrchen"},{"id":33,"github":"thomhouseholder"},{"id":34,"github":"tylercrosse"},{"id":26,"github":"cbanks813"},{"id":6,"github":"nolds9"},{"id":5,"github":"robertakarobin"},{"id":49,"github":"matiamin"},{"id":52,"github":"timothytgregg"},{"id":28,"github":"jacohen10"},{"id":9,"github":"mahartney"},{"id":41,"github":"cajam"},{"id":15,"github":"joe-gz"},{"id":22,"github":"rebeccaestes"},{"id":53,"github":"toryburgett"},{"id":48,"github":"codedre"},{"id":35,"github":"jotalp"},{"id":30,"github":"ckib16"},{"id":17,"github":"markhamshofner"},{"id":27,"github":"lizjoxx"},{"id":40,"github":"pzhang87"},{"id":14,"github":"estennett"},{"id":42,"github":"solowt"},{"id":44,"github":"elisekain"},{"id":56,"github":"armanih"},{"id":19,"github":"sammehta88"},{"id":25,"github":"stevem-ga-was"},{"id":8,"github":"jonrojas"},{"id":7,"github":"mattscilipoti"},{"id":18,"github":"mohamedgood"},{"id":20,"github":"schersh"},{"id":23,"github":"mooniker"},{"id":29,"github":"jenpen"},{"id":31,"github":"yinkaagiri"},{"id":38,"github":"lewis2ba"},{"id":43,"github":"ly900"},{"id":51,"github":"bmahoney08"},{"id":61,"github":"tkentor"},{"id":4,"github":"amaseda"},{"id":10,"github":"koryjcampbell"},{"id":66,"github":"kaustly"},{"id":69,"github":"aoave"},{"id":71,"github":"jmas13"},{"id":16,"github":"mcgrodsky"},{"id":70,"github":"alifrumin"},{"id":13,"github":"dgorgan"},{"id":12,"github":"ascreven"},{"id":55,"github":"briik"},{"id":62,"github":"321campbell"},{"id":2,"github":"jshawl"},{"id":54,"github":"clark-thomas"},{"id":72,"github":"dennizzy"},{"id":24,"github":"ddayporter"},{"id":80,"github":"garoot"},{"id":21,"github":"jnichols300"},{"id":36,"github":"murgia"},{"id":50,"github":"johnwpark"},{"id":64,"github":"mkotylevska"},{"id":65,"github":"chauncey1989"},{"id":58,"github":"andrewjohnson8819"},{"id":32,"github":"dan-ator"},{"id":60,"github":"beckybeauchamp1"},{"id":47,"github":"cpgruber"},{"id":46,"github":"jordanbrauner"},{"id":57,"github":"roshanad"},{"id":59,"github":"maur1c3"},{"id":67,"github":"screenname4eva"},{"id":37,"github":"mpopv"},{"id":73,"github":"onesick"},{"id":74,"github":"qadriyyah119"},{"id":75,"github":"noonkay"},{"id":45,"github":"ajohnson052"},{"id":68,"github":"brittonwalker"},{"id":77,"github":"andrewsunglaekim"},{"id":3,"github":"ebirving"},{"id":11,"github":"shindigira"},{"id":63,"github":"fortheben"},{"id":76,"github":"byrmor"}]

function each(collection, callback){
  for( var i = 0; i < collection.length; i++ ){
    callback(collection[i])
  }
}

function getIssues( uri, issues, callback ){
  var issues = issues || []
  request({
    uri: uri, 
    method: 'get',
    headers: {
      'User-Agent': 'wdihw'
    }
  }, function(err, res, body){
    try {
    nextUrl = res.headers.link.match(/<(.*)>; rel="next"/);
    } catch (e) {
      nextUrl = false 
    }
    var ghIssues = JSON.parse(body)
    for(var i = 0; i < ghIssues.length; i++ ){
      issues.push(ghIssues[i])
    }
    if( nextUrl ){
      getIssues( nextUrl[1], issues, callback );
    } else {
      callback(issues);
    }
  })
}

each(homeworks, function(homework){
    homework = homework.split("/").pop()
    var url = 'https://api.github.com/repos/ga-dc/' + homework + "/issues?state=all&access_token=" + process.env.token
    getIssues( url, [], function(issues){
      for(var i = 0; i < issues.length; i++){
	for(var j = 0; j < students.length; j++){
          if(students[j].github == issues[i].user.login){
	    console.log("***")
	    console.log(homework)
	    console.log(students[j].github, true)
	  }
	}
      }    
    })
})

