const { models: { User, Post } } = require('vltra-data')
// const { validate} = require('vltra-utils')

/**
 * retrieves ranking posts from db
 * 
 * @returns {Array} array with posts from db sorted by ranking.
 */

module.exports = function(){

    return(async () => {
        const ranking = []

        const posts = await Post.find({ }, { __v: 0 }).lean()

        if(posts.length === 0) throw Error(`there are no post to retrieve`)

        for(let i = 0; i < posts.length; i++){
            const post = posts[i]
            
            if(post.votes.length > 0){
                const totalvotes = post.votes.reduce((accum, current) => accum + current)

                post.totalvotes = Math.floor(totalvotes / post.votes.length)

                ranking.push(post)
            }
        }

        if(ranking.length === 0) throw Error(`there are no post with votes to retrieve`)
        
        ranking.forEach(post => {
            post.id = post._id
            delete post._id
        })
        
        ranking.sort(function (a, b) {
            if (a.totalvotes < b.totalvotes) {
              return 1;
            }
            if (a.totalvotes > b.totalvotes) {
              return -1;
            }
            return 0;
          });

        return ranking
    })()
}