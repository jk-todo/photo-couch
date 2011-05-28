function(head, req) {
    // !json templates.head
    // !json templates.comments
    // !json templates.tail

    provides("html", function() {
        var row;

		var data = {
			title: "Recent Comments",
            mainid: "comments"
		};

        var Mustache = require("vendor/couchapp/lib/mustache");
        var path = require("vendor/couchapp/lib/path").init(req);
        var markdown = require("vendor/couchapp/lib/markdown");

		send(Mustache.to_html(templates.head, data));
        while(row = getRow()) {
            send(Mustache.to_html(templates.comments.row, {
                cid: row.id,
                ts: row.doc.ts,
                realname: row.doc.realname,
                dbname: req.info.db_name,
			    note: markdown.encode(row.doc.note),
                show: path.show('item', row.doc.photo_id),
                thumb: path.attachment(row.doc.photo_id,
                                       'thumb.jpg')
			}));
		}
		send(Mustache.to_html(templates.tail, data));
    });
}