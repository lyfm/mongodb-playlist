const assert = require('assert')
const mongoose = require('mongoose')
const Author = require('../models/author')


//Describe our test

describe('Nesting records', function(){


    //Create tests
    it('Creates an author with sub-documents', function(done) {
        
        beforeEach(function(done){
            mongoose.connection.collections.authors.drop(function(){
                done()
            })
        })

        var pat = new Author({
            name: 'Patrick Anutr',
            books: [{title: 'Name of the Wind', pages: 400}]
        })

        pat.save().then(function(){
            Author.findOne({name: 'Patrick Anutr'}).then(function(record){
                assert(record.books.length === 1)
                done()
            })
        })
    })

    it('Adds a book to an author', function(done){
        
        var pat = new Author({
            name: 'Patrick Anutr',
            books: [{title: 'Name of the Wind', pages: 400}]
        })

        pat.save().then(function(){
            Author.findOne({name: 'Patrick Anutr'}).then(function(record){
                // Add a book to the books array
                record.books.push({title: "Wise Man's Fear", pages: 500})
                record.save().then(function(){
                    Author.findOne({name: 'Patrick Anutr'}).then(function(result){
                        assert(result.books.length === 2)
                        done()
                    })
                })
        })
    })
})
})