var products = [
	{id : 6, name : 'Pen', cost : 50, units : 20, category : 'stationary'},
	{id : 9, name : 'Ten', cost : 70, units : 70, category : 'stationary'},
	{id : 3, name : 'Len', cost : 60, units : 60, category : 'grocery'},
	{id : 5, name : 'Zen', cost : 30, units : 30, category : 'grocery'},
	{id : 1, name : 'Ken', cost : 20, units : 80, category : 'utencil'},
];

function describe(title, fn){
	console.group(title);
	fn();
	console.groupEnd();
}

function describeGroup(groupObject) {
  for(var key in groupObject) {
    console.table(groupObject[key]);
  }
}

describe('Default List', function(){
	console.table(products);
});

describe('Sort', function(){
	describe('Default sort [products by id]', function(){
		function sort(){
			for(var i=0; i < products.length-1; i++)
				for(var j=i+1; j < products.length; j++)
					if (products[i].id > products[j].id){
						var temp = products[i];
						products[i] = products[j];
						products[j] = temp;
					}
		};
		sort();
		console.table(products);
	});

	describe('Any list by any attribute', function(){
		function sort(list, attrName){
			for(var i=0; i < list.length-1; i++)
				for(var j=i+1; j < list.length; j++)
					if (list[i][attrName] > list[j][attrName]){
						var temp = list[i];
						list[i] = list[j];
						list[j] = temp;
					}
		};
		describe('products by cost', function(){
			sort(products, 'cost');
			console.table(products);
		});

		describe('products by units', function(){
			sort(products, 'units');
			console.table(products);
		});

	});
  function inverse(comparator) {
    return -1*comparator();
  }
	describe('Any list by any comparer', function(){
		function sort(list, comparer){
			for(var i=0; i < list.length-1; i++)
				for(var j=i+1; j < list.length; j++)
					if (comparer(list[i], list[j]) > 0){
						var temp = list[i];
						list[i] = list[j];
						list[j] = temp;
					}
    };
    
    var compareProductsByValue = function(p1, p2){
      var p1Value = p1.cost * p1.units,
        p2Value = p2.cost * p2.units;
      if (p1Value < p2Value) return -1;
      if (p1Value > p2Value) return 1;
      return 0;
    }

    function getDescendingComparer(comparer) {
      return function(p1,p2) {
        return comparer(p1,p2)*-1
      }
    }
		describe('products by value [ value = cost * units ]', function(){
			
			sort(products, compareProductsByValue);
			console.table(products);
    })
    describe('products by value  decreasing [ value = cost * units ]', function(){
			var decreasingCampareProductsByValue = getDescendingComparer(compareProductsByValue);
			sort(products, decreasingCampareProductsByValue);
			console.table(products);
		})
	})


});

describe('Filter', function(){
	describe('Default filter [stationary products]', function(){
		function filter(){
      var results = [];
      var j = 0;
      for(var i=0; i < products.length; i++) {
          if(products[i].category == 'stationary') {
            results[j++] = products[i];
          }
      }
      products = results;
    }
		//filter();
		console.table(products);
  });
  describe('Any list by any criteria', function(){
		function filter(list,criteria){
      var results = [];
      var j = 0;
      for(var i=0; i < list.length; i++) {
          if(criteria(list[i])) {
            results[j++] = list[i];
          }
      }
      return results;
    }
    describe('Filter costly products [cost > 50]', function() {
      var costlyProduct = filter(products, function(product) {
        return product.cost > 50;
      });
      console.table(costlyProduct);
    });
    describe('Filter understocked products [unit < 50]', function(){
      var underStockedProduct = filter(products, function(a) {
        return a.units < 50;
      });
      console.table(underStockedProduct);
    });
		
		
	});
});


describe('Group by', function(){
	
  describe('group by any criteria', function(){
		function filter(list,criteria){
      var results = [];
      var j = 0;
      for(var i=0; i < list.length; i++) {
          if(criteria(list[i])) {
            results[j++] = list[i];
          }
      }
      return results;
    }
    function groupby(list,criteria) {
      var results = {};
      for(var i=0; i < list.length; i++) {
        var groupByKey = criteria(list[i]);
        results[groupByKey] = results[groupByKey]  || []
        results[groupByKey].push(list[i]);
        
      }
      return results;
    }
    describe('group by any category', function(){
      var groupedProductCategory= groupby(products, function(row) {
          return row['category'];
      });
      console.log(groupedProductCategory);
    });
    describe('group by any cost', function(){
      var groupedProductCost = groupby(products, function(row) {
          return row['cost'];
      });
      describeGroup(groupedProductCost);
    });
    describe('group by any costly', function(){
      var groupedProductCost = groupby(products, function(row) {
          return row['cost'] > 50 ? "costly": "affordable";
      });
      describeGroup(groupedProductCost);
    });
  });
});