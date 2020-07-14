suite("lunr.Pipeline",function(){var e=function(){};setup(function(){this.existingRegisteredFunctions=lunr.Pipeline.registeredFunctions,this.existingWarnIfFunctionNotRegistered=lunr.Pipeline.warnIfFunctionNotRegistered,lunr.Pipeline.registeredFunctions={},lunr.Pipeline.warnIfFunctionNotRegistered=e,this.pipeline=new lunr.Pipeline}),teardown(function(){lunr.Pipeline.registeredFunctions=this.existingRegisteredFunctions,lunr.Pipeline.warnIfFunctionNotRegistered=this.existingWarnIfFunctionNotRegistered}),suite("#add",function(){test("add function to pipeline",function(){this.pipeline.add(e),assert.equal(1,this.pipeline._stack.length)}),test("add multiple functions to the pipeline",function(){this.pipeline.add(e,e),assert.equal(2,this.pipeline._stack.length)})}),suite("#remove",function(){test("function exists in pipeline",function(){this.pipeline.add(e),assert.equal(1,this.pipeline._stack.length),this.pipeline.remove(e),assert.equal(0,this.pipeline._stack.length)}),test("function does not exist in pipeline",function(){var t=function(){};this.pipeline.add(e),assert.equal(1,this.pipeline._stack.length),this.pipeline.remove(t),assert.equal(1,this.pipeline._stack.length)})}),suite("#before",function(){var t=function(){};test("other function exists",function(){this.pipeline.add(e),this.pipeline.before(e,t),assert.deepEqual([t,e],this.pipeline._stack)}),test("other function does not exist",function(){var n=function(){this.pipeline.before(e,t)};assert.throws(n.bind(this)),assert.equal(0,this.pipeline._stack.length)})}),suite("#after",function(){var t=function(){};test("other function exists",function(){this.pipeline.add(e),this.pipeline.after(e,t),assert.deepEqual([e,t],this.pipeline._stack)}),test("other function does not exist",function(){var n=function(){this.pipeline.after(e,t)};assert.throws(n.bind(this)),assert.equal(0,this.pipeline._stack.length)})}),suite("#run",function(){test("calling each function for each token",function(){var e=0,t=0,n=function(t){return e++,t},i=function(e){return t++,e};this.pipeline.add(n,i),this.pipeline.run([1,2,3]),assert.equal(3,e),assert.equal(3,t)}),test("passes token to pipeline function",function(){this.pipeline.add(function(e){assert.equal("foo",e)}),this.pipeline.run(["foo"])}),test("passes index to pipeline function",function(){this.pipeline.add(function(e,t){assert.equal(0,t)}),this.pipeline.run(["foo"])}),test("passes entire token array to pipeline function",function(){this.pipeline.add(function(e,e,t){assert.deepEqual(["foo"],t)}),this.pipeline.run(["foo"])}),test("passes output of one function as input to the next",function(){this.pipeline.add(function(e){return e.toUpperCase()}),this.pipeline.add(function(e){assert.equal("FOO",e)}),this.pipeline.run(["foo"])}),test("returns the results of the last function",function(){this.pipeline.add(function(e){return e.toUpperCase()}),assert.deepEqual(["FOO"],this.pipeline.run(["foo"]))}),test("filters out null, undefined and empty string values",function(){var e,t=[];this.pipeline.add(function(e,t){return 4==t?null:5==t?"":t%2?e:undefined}),this.pipeline.add(function(e){return t.push(e),e}),e=this.pipeline.run(["a","b","c","d","foo","bar","baz"]),assert.sameMembers(["b","d"],t),assert.sameMembers(["b","d"],e)}),suite("expanding tokens",function(){test("passed to output",function(){this.pipeline.add(function(e){return[e,e.toUpperCase()]}),assert.sameMembers(["foo","FOO"],this.pipeline.run(["foo"]))}),test("not passed to same function",function(){var e=[];this.pipeline.add(function(t){return e.push(t),[t,t.toUpperCase()]}),this.pipeline.run(["foo"]),assert.sameMembers(["foo"],e)}),test("passed to the next pipeline function",function(){var e=[];this.pipeline.add(function(e){return[e,e.toUpperCase()]}),this.pipeline.add(function(t){e.push(t)}),this.pipeline.run(["foo"]),assert.sameMembers(["foo","FOO"],e)})})}),suite("#toJSON",function(){test("returns an array of registered function labels",function(){var e=function(){};lunr.Pipeline.registerFunction(e,"fn"),this.pipeline.add(e),assert.sameMembers(["fn"],this.pipeline.toJSON())})}),suite(".registerFunction",function(){setup(function(){this.fn=function(){}}),test("adds a label property to the function",function(){lunr.Pipeline.registerFunction(this.fn,"fn"),assert.equal("fn",this.fn.label)}),test("adds function to the list of registered functions",function(){lunr.Pipeline.registerFunction(this.fn,"fn"),assert.equal(this.fn,lunr.Pipeline.registeredFunctions.fn)})}),suite(".load",function(){test("with registered functions",function(){var e,t=function(){},n=["fn"];lunr.Pipeline.registerFunction(t,"fn"),e=lunr.Pipeline.load(n),assert.equal(1,e._stack.length),assert.equal(t,e._stack[0])}),test("with unregisterd functions",function(){var e=["fn"];assert.throws(function(){lunr.Pipeline.load(e)})})}),suite("#reset",function(){test("empties the stack",function(){this.pipeline.add(function(){}),assert.equal(1,this.pipeline._stack.length),this.pipeline.reset(),assert.equal(0,this.pipeline._stack.length)})})});