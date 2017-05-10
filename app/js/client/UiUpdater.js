const AddCatalogEvent = require('../events/AddCatalogEvent');
const RemoveProductEvent = require('../events/RemoveProductEvent');
const RemoveCategoryEvent = require('../events/RemoveCategoryEvent');
const SetProductCategoryEvent = require('../events/SetProductCategoryEvent');
const SetProductAttributeEvent = require('../events/SetProductAttributeEvent');

class UiUpdater {
    static  updateCategoryTable(catalog) {
        const tbody = $("#tbody-categories");

        tbody.empty();
        catalog.categories.forEach((category) => {
            tbody
                .append($('<tr>')
                    .append($('<td>')
                        .append(category.id)
                    )
                    .append($('<td>')
                        .append(category.name)
                    )
                    .append($('<td>')
                        .append($('<button/>', {
                            text: 'remove',
                            class: 'btn btn-primary',
                            click: () => {
                                UiUpdater.processEvent(new RemoveCategoryEvent(catalog, category.id));
                            }
                        }))
                    )
                )
        });
    }

    static updateProductTable(catalog) {
        const tbody = $("#tbody-products");

        tbody.empty();
        catalog.products.forEach((product) => {
            let categoryName = '';
            if (product.category) {
                categoryName = product.category.name;
            }

            tbody
                .append($('<tr>')
                    .append($('<td>')
                        .append(product.id)
                    )
                    .append($('<td>')
                        .append(product.name)
                    )
                    .append($('<td>')
                        .append(categoryName)
                    )
                    .append($('<td>')
                        .append(product.price)
                    )
                    .append($('<td>')
                        .append(product.visible)
                    )
                    .append($('<td>')
                        .append(product.color)
                    )
                    .append($('<td>')
                        .append($('<button/>', {
                            text: 'edit',
                            class: 'btn btn-primary',
                            click: () => {
                                UiUpdater.openUpdateForm(product);
                            }
                        }))
                        .append($('<button/>', {
                            text: 'remove',
                            class: 'btn btn-primary',
                            click: () => {
                                UiUpdater.processEvent(new RemoveProductEvent(catalog, product.id));
                            }
                        }))
                    )
                )
        });
    }

    static processEvent(event) {
        event.process();
        UiUpdater.update(event.catalog);
    }

    static update(catalog) {
        UiUpdater.updateCategoryTable(catalog);
        UiUpdater.updateProductTable(catalog);

        const categoriesSelect = $('#productCategory');

        categoriesSelect.empty();
        catalog.categories.forEach((category) => {
            categoriesSelect.append($('<option></option>').val(category.id).html(category.name));
        });
        categoriesSelect.val('');
    }

    static openUpdateForm(product) {
        $('#productId').val(product.id);
        $('#productName').val(product.name);
        $('#productPrice').val(product.price);
        $('#productVisible').val(product.visible);
        $('#productColor').val(product.color);

        if (product.category) {
            $('#productCategory').val(product.category.id);
        }

        $('#productFormModal').modal('show');
    }

    static resetUpdateForms() {
        $('#productId').val('');
        $('#productName').val('');
        $('#productPrice').val('');
        $('#productVisible').val('');
        $('#productColor').val('');
        $('#productCategory').val('');

        $('#categoryName').val('');
    }
}

module.exports = UiUpdater;