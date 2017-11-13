var initialCat = [{
        clickCount: 0,
        name: 'TABBY',
        imgSrc: 'images/1.jpg'
    },
    {
        clickCount: 0,
        name: 'Tiger',
        imgSrc: 'images/2.jpg'
    },
    {
        clickCount: 0,
        name: 'Scaredy',
        imgSrc: 'images/3.jpg'
    },
    {
        clickCount: 0,
        name: 'Shadow',
        imgSrc: 'images/4.jpg'
    },
    {
        clickCount: 0,
        name: 'Evan',
        imgSrc: 'images/5.jpg'
    },

];
var Cat = function(data) {
    this.clickCount = ko.observable(data.clickCount);
    this.name = ko.observable(data.name);
    this.imgSrc = ko.observable(data.imgSrc);
    this.nicknames = ko.observableArray(['Tabtab', 'T-Bone', 'Mr.Terry', 'Tabitha Tab Tabby Catty Cat']);

    var that = this;

    this.title = ko.computed(function() {
        var title;
        var clicks = this.clickCount();
        if (clicks < 10) {
            title = 'Newborn';
        } else if (clicks < 50) {
            title = 'Infant';
        } else if (clicks < 100) {
            title = 'Child';
        } else if (clicks < 200) {
            title = 'Teen';
        } else if (clicks < 500) {
            title = 'Adult';
        } else if (clicks < 1000) {
            title = 'Ninja';
        }
        return title;
    }, this);
}

var ViewModel = function() {
    var self = this;

    self.isAdmin = ko.observable(false);

    this.catList = ko.observableArray([]);

    initialCat.forEach(function(catItem) {
    	self.catList.push(new Cat(catItem));
    });

    this.currentCat = ko.observable(this.catList()[0]);

    this.incrementCounter = function() {
        self.currentCat().clickCount(Number(self.currentCat().clickCount()) + 1);
    };

    this.setCurrentCat = function(clickedCat) {
    	self.currentCat(clickedCat);
    }

    this.toggleAdmin = function() {
    	if(self.isAdmin()) {
    		self.isAdmin(false);
    	} else {
    		self.isAdmin(true);
    	}
    }

};

ko.applyBindings(new ViewModel());