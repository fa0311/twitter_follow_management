class twitter_follow_management {

    constructor() {
        this.style_list = {
            'following': {
                'style': [
                    '',
                    '.css-901oao.css-bfa6kz.r-1q142lx.r-1tl8opc.r-n6v787.r-16dba41.r-1sf4r6n.r-1f6r7vd.r-bcqeeo.r-ou255f.r-qvutc0 > span.css-901oao.css-16my406.r-1tl8opc.r-ad9z0x.r-bcqeeo.r-qvutc0'
                ],
                'btn': [
                    'デフォルト',
                    'フォローされていない'
                ]
            },
            'followers': {
                'style': [
                    '',
                    '.css-18t94o4.css-1dbjc4n.r-1niwhzg.r-sdzlij.r-1phboty.r-rs99b7.r-1w2pmg.r-1vsu8ta.r-aj3cln.r-1ny4l3l.r-1fneopy.r-o7ynqc.r-6416eg.r-lrvibr > ',
                    '.css-18t94o4.css-1dbjc4n.r-sdzlij.r-1phboty.r-rs99b7.r-1w2pmg.r-1vsu8ta.r-aj3cln.r-1ny4l3l.r-1fneopy.r-o7ynqc.r-6416eg.r-lrvibr > .css-901oao.r-1awozwy.r-jwli3a.r-6koalj.r-18u37iz.r-16y2uox.r-1tl8opc.r-a023e6.r-vw2c0b.r-1777fci.r-eljoum.r-dnmrzs.r-bcqeeo.r-q4m81j.r-qvutc0'
                ],
                'btn': [
                    'デフォルト',
                    'フォローしている',
                    'フォローしていない'
                ]
            }
        };

        this.section = '.css-1dbjc4n.r-1ljd8xs.r-13l2t4g.r-1phboty.r-1jgb5lz.r-11wrixw.r-61z16t.r-1ye8kvj.r-13qz1uu.r-184en5c section.css-1dbjc4n ';
        this.url = location.href;
        this.checked = '0';
        this.mainloop_s(500);
    }

    mainloop() {
        var that = this;
        that.add_btn();
        if (this.get_checked() != this.checked) {
            if (this.checked != '0') {
                this.reload_user();
            }
            this.checked = this.get_checked();
        }
        if (this.url != location.href) {
            this.checked = '0';
            if (this.style_list[this.get_key()] && this.style_list[this.get_key(this.url)]) this.reload_user();
            this.url = location.href;
            $('.twitter_follow_management_setbox').remove();
            this.mainloop_s(500);
            return;
        }
        if (this.style_list[this.get_key()]) {
            this.hide_user();
            this.mainloop_s(100);
            return;
        }
        this.mainloop_s(500);
    }
    mainloop_s(i) {
        var that = this;
        setTimeout(
            function () {
                that.add_btn();
                that.mainloop();
            }, i);
    }

    get_key(link = location.href) {
        let match = /[^\/]+?$/;
        return link.match(match);
    }
    get_checked() {
        return $("input[name='accessible-radio']:checked").val();
    }
    hide_user() {
        var style = this.section + this.style_list[this.get_key()]['style'][this.get_checked()];
        var that = this;
        console.log(style);
        $(style).each(
            function () {
                $(style).closest(that.section + '.css-1dbjc4n.r-qklmqi.r-1adg3ll').remove();
            }
        );
    }
    reload_user() {
        var height = $(document).height();
        window.scroll(0, height);

        function scroll() {
            if ($(document).height() / height > 0.8) {
                setTimeout(
                    function () {
                        window.scroll(0, 0);
                    }, 100);
            } else {
                setTimeout(scroll, 100);
            }
        }
        setTimeout(scroll, 100);
    }
    add_btn() {
        if (!$('.twitter_follow_management_setbox').text()) {
            var that = this;

            function input(i) {
                let def_checked = function () {
                    return i == '0' ? 'checked="checked"' : '';
                }
                return '<input id="item-' + i + '" class="radio-inline__input" type="radio" name="accessible-radio" value="' + i + '" ' + def_checked() + '/>' +
                    '<label class="radio-inline__label" for="item-' + i + '">' + that.style_list[that.get_key()]['btn'][i] + '</label>';
            }
            var html = "";
            if (this.style_list[this.get_key()] == null) return;
            this.style_list[this.get_key()]['style'].forEach(function (data, i) {
                html = html + input(i);
            });
            $('.css-1dbjc4n.r-aqfbo4.r-rull8r.r-qklmqi.r-gtdqiz.r-ipm5af.r-1g40b8q .css-1dbjc4n.r-1h3ijdo.r-1j3t67a').append('<div class="twitter_follow_management_setbox">' +
                html +
                '</div>');
        }
    }
}

new twitter_follow_management();