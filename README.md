# social-network-api

[video tutorial](https://drive.google.com/file/d/1BZD7FDUexs7Ikch1t96fpZni5oJJStTL/view)

## Description
Social-network-api is a complete back-end for a potential social network site, that has get routes for thoughts and users. Users can add/delete friends, thoughts and even react to thoughts.

## Technologies used
JS, node.js, express and mongoose.
Made on VS Code, and run in command line Insomnia.

## Code and Functionality

### This is the code I used to connect to mongoose:
```
mongoose.connect('mongodb://localhost:27017/myapp', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.set('debug', true);
```

### Code used to instantiate a virtual model:
```
thoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length
});
```

## Here is how I am getting the timestamps:
```
createdAt: {
    type: Date,
    get: (date) => {
        if (date) return date.toISOString().split("T") [0];
    }
},
```

## Contact Infromation

[E-mail: Snyh121@gmail.com](mailto:snyh121@gmail.com)  
[GitHub: snyh212](https://github.com/snyh212)  
[LinkdIn: Shmuel-Hoffman](https://www.linkedin.com/in/shmuel-hoffman-254b0223b?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3BS2rg0PtBTLeG2szT2ZbGmg%3D%3D)