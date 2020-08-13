module.exports = function Cart(old) {
    this.items = old.items || {};
    this.totalQty = old.totalQty || 0;
    this.totalPrice = old.totalPrice || 0;

    this.add = function (item, id) {
        var storedItem = this.items[id];
        if (!storedItem)
        {
            storedItem = this.items[id] = {item: item, qty: 0, mealPackagePrice: 0};
        }
        storedItem.qty++;
        storedItem.mealPackagePrice = storedItem.item.mealPackagePrice * storedItem.qty;
        this.totalQty++;
        this.totalPrice += storedItem.item.mealPackagePrice;
    };

    this.generateArray = function(){
        var arr = [];
        for (var id in this.items) {
            arr.push(this.items[id]);
        }
        return arr;
    };
};