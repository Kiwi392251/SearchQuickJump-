(function () {
    'use strict';

    function getSearchQuery() {
        const url = new URL(window.location.href);
        let query = '';

        if (url.hostname.includes('google.com')) {
            query = url.searchParams.get('q');
        } else if (url.hostname.includes('bing.com')) {
            query = url.searchParams.get('q');
        } else if (url.hostname.includes('yahoo.com')) {
            query = url.searchParams.get('p');
        } else if (url.hostname.includes('baidu.com')) {
            query = url.searchParams.get('wd');
        } else if (url.hostname.includes('sogou.com')) {
            query = url.searchParams.get('query');
        } else if (url.hostname.includes('so.com')) {
            query = url.searchParams.get('q');
        }

        return query ? encodeURIComponent(query.trim()) : '';
    }

    function createButtonContainer() {
        const container = document.createElement('div');
        container.style.position = 'fixed';
        container.style.top = '100px';
        container.style.right = '20px';
        container.style.zIndex = '9999';
        container.style.display = 'flex';
        container.style.flexDirection = 'column';
        container.style.gap = '10px';
        container.style.width = '120px';
        return container;
    }

    function createButton(text, color, urlTemplate) {
        const button = document.createElement('button');
        button.textContent = text;
        button.style.backgroundColor = color;
        button.style.color = 'white';
        button.style.border = 'none';
        button.style.borderRadius = '12px';
        button.style.padding = '8px 12px';
        button.style.cursor = 'pointer';
        button.style.fontWeight = 'bold';
        button.style.boxShadow = '0 2px 5px rgba(0,0,0,0.2)';
        button.style.transition = 'all 0.3s ease';
        button.style.width = '100%';
        button.style.textAlign = 'center';

        button.addEventListener('mouseover', () => {
            button.style.transform = 'scale(1.05)';
            button.style.boxShadow = '0 4px 8px rgba(0,0,0,0.3)';
        });
        button.addEventListener('mouseout', () => {
            button.style.transform = 'scale(1)';
            button.style.boxShadow = '0 2px 5px rgba(0,0,0,0.2)';
        });

        button.addEventListener('click', () => {
            const query = getSearchQuery();
            if (query) {
                window.open(urlTemplate.replace('(query)', query), '_blank');
            }
        });

        return button;
    }

    function main() {
        const query = getSearchQuery();
        if (!query) return;

        const container = createButtonContainer();

        container.appendChild(createButton('小红书', '#FF2442', 'https://www.xiaohongshu.com/search_result?keyword=(query)&source=web_search_result_notes'));
        container.appendChild(createButton('抖音', '#000000', 'https://www.douyin.com/search/(query)?source=web_search_result'));
        container.appendChild(createButton('B站', '#FB7299', 'https://search.bilibili.com/all?keyword=(query)'));
        container.appendChild(createButton('豆瓣', '#007722', 'https://www.douban.com/search?q=(query)'));
        container.appendChild(createButton('ChatGPT', '#10A37F', 'https://chat.openai.com/?q=(query)'));

        document.body.appendChild(container);
    }

    window.addEventListener('load', main);
})();
