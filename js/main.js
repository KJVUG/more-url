// 链接数据存储
const links = [
    {
        category: '常用官网',
        links: [
            { name: '百度', url: 'www.baidu.com' },
            { name: 'CSDN', url: 'https://blog.csdn.net/KJVUG' },
            { name: 'Gitee', url: 'https://gitee.com/kjvug/projects' },
            { name: 'GitHub', url: 'https://github.com/' },
            { name: '课堂派', url: 'https://www.ketangpai.com/#/login' },
            { name: '学习通', url: 'https://i.mooc.chaoxing.com/space/index?t=1699439116469' },
            { name: '岭南统一门户入口', url: 'https://sso.lnc.edu.cn/lyuapServer/login?service=https://portals.lnc.edu.cn/shiro-cas' },
            { name: '智慧职教', url: 'https://zjy2.icve.com.cn/study/index' }
        ]
    },
    {
        category: 'AI工具',
        links: [
            { name: 'deepseek', url: 'https://chat.deepseek.com/' },
            { name: '文心一言', url: 'https://yiyan.baidu.com/' },
            { name: '百度文库', url: 'https://wenku.baidu.com/ndlaunch/browse/chat' },
            { name: '讯飞智文', url: 'https://zhiwen.xfyun.cn/generate' },
            { name: 'ProcessOn', url: 'https://www.processon.com/login' },
            { name: '阿里巴巴矢量图标库', url: 'https://www.iconfont.cn/' },
            { name: '有道云笔记', url: 'https://note.youdao.com/?keyfrom=ydoc' },
            { name: '简历本', url: 'https://www.jianliben.com/' }
        ]
    },
    {
        category: '常用资料',
        links: [
            { name: 'Java学习路线', url: 'https://www.bilibili.com/read/cv5216534/' },
            { name: 'Spring Boot笔记', url: 'https://www.wolai.com/v5Kuct5ZtPeVBk4NBUGBWF' },
            { name: '百度网盘', url: 'https://pan.baidu.com/' },
            { name: '阿里云网盘', url: 'https://www.alipan.com/' },
            { name: '腾讯云', url: 'https://cloud.tencent.com/' },
            { name: '若依', url: 'https://ruoyi.vip/' },
            { name: '微信', url: 'https://weixin.qq.com/' },
            { name: 'realme互传', url: 'https://cloud.realme.com/login.html' }
        ]
    },
    {
        category: '休闲娱乐',
        links: [
            { name: '敲敲键盘', url: 'https://qwerty.kaiyi.cool/' },
            { name: '力扣', url: 'https://leetcode.cn/problemset/' },
            { name: '牛客网', url: 'https://www.nowcoder.com/' },
            { name: '蓝桥杯', url: 'https://www.lanqiao.cn/' },
            { name: '微信公众号', url: 'https://mp.weixin.qq.com/' },
            { name: '微博', url: 'https://weibo.com/' },
            { name: '小红书', url: 'https://www.xiaohongshu.com/', localIcon: 'xiaohongshu.svg' },
            { name: '抖音', url: 'https://www.douyin.com/' },
            { name: '淘剧', url: 'https://www.tjutv.com/' },
            { name: '京东', url: 'https://www.jd.com/' },
            { name: '4399', url: 'https://www.4399.com/' }
        ]
    }
];

// DOM加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    renderLinks();
    document.getElementById('searchInput').addEventListener('input', searchLinks);
});

// 渲染链接列表
function renderLinks(filteredLinks = null) {
    const container = document.getElementById('linksContainer');
    container.innerHTML = '';

    const linksToRender = filteredLinks || links;

    linksToRender.forEach(category => {
        if (category.links.length === 0) return;

        const card = document.createElement('div');
        card.className = 'category-card';

        const header = document.createElement('div');
        header.className = 'category-header';
        header.textContent = category.category;
        card.appendChild(header);

        const list = document.createElement('ul');
        list.className = 'links-list';

        category.links.forEach(link => {
            const item = document.createElement('li');
            item.className = 'link-item';

            const a = document.createElement('a');
            a.href = '#';
            a.onclick = (e) => {
                e.preventDefault();
                openUrl(link.url);
            };

            // 添加网站图标
            const favicon = document.createElement('img');
            favicon.className = 'favicon';
            // 优先使用本地图标，如果有定义的话
            if (link.localIcon) {
                favicon.src = `./img/${link.localIcon}`;
            } else {
                favicon.src = `https://www.google.com/s2/favicons?domain=${new URL(link.url.startsWith('http') ? link.url : 'https://' + link.url).hostname}`;
            }
            favicon.alt = link.name;
            a.appendChild(favicon);

            const nameSpan = document.createElement('span');
            nameSpan.className = 'link-name';
            nameSpan.textContent = link.name;
            a.appendChild(nameSpan);

            item.appendChild(a);
            list.appendChild(item);
        });

        card.appendChild(list);
        container.appendChild(card);
    });
}

// 打开链接函数
function openUrl(url) {
    try {
        if (!url.startsWith('http')) {
            url = 'https://' + url;
        }
        window.open(url, '_blank');
        return 0;
    } catch (error) {
        alert(`无法打开链接: ${url}\n错误信息: ${error.message}`);
        console.error('无法打开网址:', error);
        return 1;
    }
}

// 搜索链接函数
function searchLinks() {
    const input = document.getElementById('searchInput').value.toLowerCase();
    if (!input) {
        renderLinks();
        return;
    }

    const filtered = links.map(category => ({
        ...category,
        links: category.links.filter(link => 
            link.name.toLowerCase().includes(input) || 
            link.url.toLowerCase().includes(input)
        )
    }));

    renderLinks(filtered);
}