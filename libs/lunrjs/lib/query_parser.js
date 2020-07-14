lunr.QueryParser=function(e,r){this.lexer=new lunr.QueryLexer(e),this.query=r,this.currentClause={},this.lexemeIdx=0},lunr.QueryParser.prototype.parse=function(){this.lexer.run(),this.lexemes=this.lexer.lexemes;for(var e=lunr.QueryParser.parseClause;e;)e=e(this);return this.query},lunr.QueryParser.prototype.peekLexeme=function(){return this.lexemes[this.lexemeIdx]},lunr.QueryParser.prototype.consumeLexeme=function(){var e=this.peekLexeme();return this.lexemeIdx+=1,e},lunr.QueryParser.prototype.nextClause=function(){var e=this.currentClause;this.query.clause(e),this.currentClause={}},lunr.QueryParser.parseClause=function(e){var r=e.peekLexeme();if(r!=undefined)switch(r.type){case lunr.QueryLexer.PRESENCE:return lunr.QueryParser.parsePresence;case lunr.QueryLexer.FIELD:return lunr.QueryParser.parseField;case lunr.QueryLexer.TERM:return lunr.QueryParser.parseTerm;default:var u="expected either a field or a term, found "+r.type;throw r.str.length>=1&&(u+=" with value '"+r.str+"'"),new lunr.QueryParseError(u,r.start,r.end)}},lunr.QueryParser.parsePresence=function(e){var r=e.consumeLexeme();if(r!=undefined){switch(r.str){case"-":e.currentClause.presence=lunr.Query.presence.PROHIBITED;break;case"+":e.currentClause.presence=lunr.Query.presence.REQUIRED;break;default:var u="unrecognised presence operator'"+r.str+"'";throw new lunr.QueryParseError(u,r.start,r.end)}var n=e.peekLexeme();if(n==undefined){u="expecting term or field, found nothing";throw new lunr.QueryParseError(u,r.start,r.end)}switch(n.type){case lunr.QueryLexer.FIELD:return lunr.QueryParser.parseField;case lunr.QueryLexer.TERM:return lunr.QueryParser.parseTerm;default:u="expecting term or field, found '"+n.type+"'";throw new lunr.QueryParseError(u,n.start,n.end)}}},lunr.QueryParser.parseField=function(e){var r=e.consumeLexeme();if(r!=undefined){if(-1==e.query.allFields.indexOf(r.str)){var u=e.query.allFields.map(function(e){return"'"+e+"'"}).join(", "),n="unrecognised field '"+r.str+"', possible fields: "+u;throw new lunr.QueryParseError(n,r.start,r.end)}e.currentClause.fields=[r.str];var s=e.peekLexeme();if(s==undefined){n="expecting term, found nothing";throw new lunr.QueryParseError(n,r.start,r.end)}switch(s.type){case lunr.QueryLexer.TERM:return lunr.QueryParser.parseTerm;default:n="expecting term, found '"+s.type+"'";throw new lunr.QueryParseError(n,s.start,s.end)}}},lunr.QueryParser.parseTerm=function(e){var r=e.consumeLexeme();if(r!=undefined){e.currentClause.term=r.str.toLowerCase(),-1!=r.str.indexOf("*")&&(e.currentClause.usePipeline=!1);var u=e.peekLexeme();if(u!=undefined)switch(u.type){case lunr.QueryLexer.TERM:return e.nextClause(),lunr.QueryParser.parseTerm;case lunr.QueryLexer.FIELD:return e.nextClause(),lunr.QueryParser.parseField;case lunr.QueryLexer.EDIT_DISTANCE:return lunr.QueryParser.parseEditDistance;case lunr.QueryLexer.BOOST:return lunr.QueryParser.parseBoost;case lunr.QueryLexer.PRESENCE:return e.nextClause(),lunr.QueryParser.parsePresence;default:var n="Unexpected lexeme type '"+u.type+"'";throw new lunr.QueryParseError(n,u.start,u.end)}else e.nextClause()}},lunr.QueryParser.parseEditDistance=function(e){var r=e.consumeLexeme();if(r!=undefined){var u=parseInt(r.str,10);if(isNaN(u)){var n="edit distance must be numeric";throw new lunr.QueryParseError(n,r.start,r.end)}e.currentClause.editDistance=u;var s=e.peekLexeme();if(s!=undefined)switch(s.type){case lunr.QueryLexer.TERM:return e.nextClause(),lunr.QueryParser.parseTerm;case lunr.QueryLexer.FIELD:return e.nextClause(),lunr.QueryParser.parseField;case lunr.QueryLexer.EDIT_DISTANCE:return lunr.QueryParser.parseEditDistance;case lunr.QueryLexer.BOOST:return lunr.QueryParser.parseBoost;case lunr.QueryLexer.PRESENCE:return e.nextClause(),lunr.QueryParser.parsePresence;default:n="Unexpected lexeme type '"+s.type+"'";throw new lunr.QueryParseError(n,s.start,s.end)}else e.nextClause()}},lunr.QueryParser.parseBoost=function(e){var r=e.consumeLexeme();if(r!=undefined){var u=parseInt(r.str,10);if(isNaN(u)){var n="boost must be numeric";throw new lunr.QueryParseError(n,r.start,r.end)}e.currentClause.boost=u;var s=e.peekLexeme();if(s!=undefined)switch(s.type){case lunr.QueryLexer.TERM:return e.nextClause(),lunr.QueryParser.parseTerm;case lunr.QueryLexer.FIELD:return e.nextClause(),lunr.QueryParser.parseField;case lunr.QueryLexer.EDIT_DISTANCE:return lunr.QueryParser.parseEditDistance;case lunr.QueryLexer.BOOST:return lunr.QueryParser.parseBoost;case lunr.QueryLexer.PRESENCE:return e.nextClause(),lunr.QueryParser.parsePresence;default:n="Unexpected lexeme type '"+s.type+"'";throw new lunr.QueryParseError(n,s.start,s.end)}else e.nextClause()}};