suite("serialization",function(){setup(function(){var e=[{id:"a",title:"Mr. Green kills Colonel Mustard",body:"Mr. Green killed Colonel Mustard in the study with the candlestick. Mr. Green is not a very nice fellow.",wordCount:19},{id:"b",title:"Plumb waters plant",body:"Professor Plumb has a green plant in his study",wordCount:9},{id:"c",title:"Scarlett helps Professor",body:"Miss Scarlett watered Professor Plumbs green plant while he was away from his office last week.",wordCount:16},{id:"d",title:"All about JavaScript",body:"JavaScript objects have a special __proto__ property",wordCount:7}];this.idx=lunr(function(){this.ref("id"),this.field("title"),this.field("body"),e.forEach(function(e){this.add(e)},this)}),this.serializedIdx=JSON.stringify(this.idx),this.loadedIdx=lunr.Index.load(JSON.parse(this.serializedIdx))}),test("search",function(){var e=this.idx.search("green"),t=this.loadedIdx.search("green");assert.deepEqual(e,t)}),test("__proto__ double serialization",function(){var e=lunr.Index.load(JSON.parse(JSON.stringify(this.loadedIdx))),t=this.idx.search("__proto__"),i=e.search("__proto__");assert.deepEqual(t,i)})});