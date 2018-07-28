#Traffic lights

Сделать на JS светофор основной (3 цвета) и связанный пешеходный (2 цвета) с кнопкой по запросу пешеходного перехода:
1) основной включен на зеленый, пешеходный на красный
2) по нажатию на запрос, через не менее чем 5 секунд на 5 секунд показывается желтый на основном, затем основной - красный, пешеходный зеленый на 15 секунд. После пешеходный на красный, основной сразу на зеленый.
3) минимальное время зеленого на основном - 60 секунд. Если кнопка запроса перехода нажата ранее 60 секунд с момента включения зеленого - пункт 2 срабатывает через 60 секунд с момента включения зеленого.
4) после нажатия запроса и до включения зеленого на основном светофоре, кнопка запроса игнорируется.

Часть задачи - сделать отображение светофоров, и кнопку. Кнопка всегда доступна к нажатию (не ставим атрибут disabled). Другая часть - реализовать асинхронную логику. По возможности на чистом JS (не прибегая к библиотекам).




Somehow, most examples of Git’s clone command show a subfolder for the repository to be cloned into. I, for example, prefer navigating to the desired directory and like to clone into the current directory. The Git command has to be changed to appear as follows:
```bash	
git clone git@github.com:your-username/repository-name.git .

git clone https://github.com/your-username/repository-name .
```

(stolen from the Internet)