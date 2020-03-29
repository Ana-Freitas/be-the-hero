
exports.up = function (knex) {
    return knex.schema.createTable('incidents', function (table) {
        /*irá gerar uma chave primária automatica */
        table.increments();
        table.string('title').notNullable();
        table.string('description').notNullable();
        table.decimal('value').notNullable();

        /*coluna para armazenar o id da ong que criou o caso */
        table.string('ong_id').notNullable();
        /* indicando que o campo ong_id é uma chave estrangeira,
        ou seja, deve existir na tabela ongs */
        table.foreign('ong_id').references('id').inTable('ongs');

    })
};

exports.down = function (knex) {
    return knex.schema.dropTable('incidents');
};
