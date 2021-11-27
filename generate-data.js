//import faker from 'faker';
//Set locale to use Vietnamese
const faker = require('faker');
const fs = require('fs');

faker.locale = 'vi'
console.log(faker.commerce.department())
console.log(faker.commerce.productName())
console.log(faker.commerce.productDescription())

const randomCategoryList = (n) => {
    if(n<=0) return []
    const categoryList = []
    Array.from(new Array(n)).forEach(() => {
        const category = {
            id: faker.datatype.uuid(),
            name: faker.commerce.productName(),
            createdAt: Date.now(),
            updatedAt: Date.now()

        }

        categoryList.push(category)
    })

    return categoryList
}

const randomProductList = (categoryList, numberProduct) => {
    if(numberProduct <=0 ) return
    const productList = []
    for(const category of categoryList) {
        Array.from(new Array(numberProduct)).forEach(() => {
            const product = {
                categoryId: category.id,
                id : faker.datatype.uuid(),
                name: faker.commerce.productName(),
                color: faker.commerce.color(),
                price: Number.parseInt(faker.commerce.price()),
                description: faker.commerce.productDescription(),
                createdAt: Date.now(),
                updatedAt: Date.now(),
                thumbnailUrl: faker.image.imageUrl(300,300),
                
            }
            productList.push(product)

        })
    }
    return productList

}

;(() => {
    //random database
    const categoryList = randomCategoryList(4)
    const productList = randomProductList(categoryList,5)
    // prepare db object 
    const db = {
        categories : categoryList,
        products: productList,
        profile: {
            name: "ManhTuan",
        }
    }

    fs.writeFile('./db.json',JSON.stringify(db),() => {
        console.log("Generate-data Success")
    })

})()