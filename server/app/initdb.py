def initDB():
    Rest(name='zhangzhenqiang', remark='zanwu').save()
    Rest(name='zhangwanxia', remark='zanwu').save()
    Rest(name='zhangsiyuan', remark='zanwu').save()

    Member(name='lusuo', nickname='ls').save()
    Member(name='huyulin', nickname='hyl').save()
    Member(name='yusha', nickname='ys').save()