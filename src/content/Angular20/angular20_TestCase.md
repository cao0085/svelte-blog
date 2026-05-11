---
title: "Test Case"
date: "2026-04-23"
category: "software"
subCategory: "Angular20"
tags: ["fronted", "angular", "test"]
slug: "angular_test_case"
---
###### 測試

---

### Vitest

執行測試、斷言、mock、假計時器

```md
- describe('名稱', () => {}) : 將該測試分組，內部允許多個 it

- it('名稱', () => {}) : 單個測試案例

- beforeEach(() => {}) : 每個 it 執行前跑，做初始化

- afterEach(() => {}) : 每個 it 執行後跑，做清理
```

```ts
// 常見斷言
expect(x).toBe(y) // 嚴格相等 (===)
expect(x).toEqual(y) // 深度相等 (物件/陣列比較)
expect(x).toBeNull() // === null
expect(x).toHaveLength(n) // 長度 n
expect(x).toContain(v) // 陣列含 v
expect(fn).not.toThrow() // error
expect(mock).toHaveBeenCalledWith(...) // Mock 被指定參數呼叫過
```  

```ts
// api
vi.fn() // 假函數
 .mockReturnValue(x) // 設定假函數的回傳值
vi.useFakeTimers() // 接管 setTimeout/setInterval
vi.useRealTimers() 
vi.advanceTimersByTime(ms) // 假時間推進  
```

### Angular TestBed

模擬 angular di 注入環境

```md
- TestBed.configureTestingModule({ providers: [] }) 設定 DI 容器，宣告要注入哪些服務

- TestBed.inject(ServiceClass) 從 DI 容器取出 service 實例

-  { provide: A, useValue: mockA }
```

#### RxJS

- of(value) │ 建立一個立即發出 value 然後完成的 Observable，常用來 mock API 回應


### 測試類型


#### 純函數

```js
export function buildMenuTree(data: Menu[]): MenuTreeNode[] {
    if (!Array.isArray(data)) return [];

    const map = new Map<string, MenuTreeNode>();
    const roots: MenuTreeNode[] = [];

    data.forEach((item) => {
        map.set(item.id, {
            id: item.id,
            parentId: item.parentId,
            displayName: item.displayName,
            sortOrder: item.sortOrder,
            route: item.route,
            children: [],
            expand: false,
        });
    });

    data.forEach((item) => {
        const node = map.get(item.id)!;
        if (item.parentId === null || item.parentId === '') {
            roots.push(node);
        } else {
            const parent = map.get(item.parentId);
            if (parent) {
                parent.children!.push(node);
            }
        }
    });

    sortMenuTree(roots);

    return roots;
}
```

```js

function makeMenu(overrides: Partial<Menu> & { id: string }): Menu {
  return {
    parentId: null,
    displayName: 'Menu',
    route: null,
    icon: null,
    sortOrder: 0,
    endpointName: null,
    isEndpoint: false,
    isActive: true,
    isVisible: true,
    ...overrides,
  };
}


describe('buildMenuTree', () => {

  describe('邊界輸入', () => {

    it('空陣列回傳空樹', () => {
      expect(buildMenuTree([])).toEqual([]);
    });

    it('非陣列輸入回傳空樹', () => {
      expect(buildMenuTree(null as any)).toEqual([]);
      expect(buildMenuTree(undefined as any)).toEqual([]);
    });

  });

  describe('樹狀結構建立', () => {

    it('單一根節點', () => {
      const menus = [makeMenu({ id: '1', displayName: '首頁' })];
      const tree = buildMenuTree(menus);

      expect(tree).toHaveLength(1);
      expect(tree[0].id).toBe('1');
      expect(tree[0].children).toEqual([]);
    });

    it('多個根節點（parentId 為 null）', () => {
      const menus = [
        makeMenu({ id: '1', displayName: '首頁' }),
        makeMenu({ id: '2', displayName: '系統管理' }),
      ];
      const tree = buildMenuTree(menus);

      expect(tree).toHaveLength(2);
    });

    it('子節點掛在正確的父節點下', () => {
      const menus = [
        makeMenu({ id: 'parent', displayName: '系統管理' }),
        makeMenu({ id: 'child', displayName: '使用者管理', parentId: 'parent' }),
      ];
      const tree = buildMenuTree(menus);

      expect(tree).toHaveLength(1);
      expect(tree[0].children).toHaveLength(1);
      expect(tree[0].children![0].id).toBe('child');
    });

    it('三層巢狀結構正確建立', () => {
      const menus = [
        makeMenu({ id: 'root' }),
        makeMenu({ id: 'mid', parentId: 'root' }),
        makeMenu({ id: 'leaf', parentId: 'mid' }),
      ];
      const tree = buildMenuTree(menus);

      expect(tree[0].children![0].children![0].id).toBe('leaf');
    });

    it('parentId 找不到對應節點時，該節點不出現在樹中', () => {
      const menus = [makeMenu({ id: '1', parentId: 'ghost-id' })];
      const tree = buildMenuTree(menus);

      expect(tree).toHaveLength(0);
    });

  });

});

```


#### 物件導入

```js
export function routeValidator(control: AbstractControl): ValidationErrors | null {
    if (!control.value) return null;
    return /^[a-z0-9-]+$/.test(control.value) ? null : { invalidRoute: true };
}
```

```js
describe('routeValidator', () => {
  let control: FormControl;
    
  // 每個 case 都要模擬 control 物件
  beforeEach(() => {
    control = new FormControl();
  });
  
  /** 原函數驗證器通過為 null
  * 合法斷言用 toBeNull()
  * 失敗斷言用 toEqual({ invalidRoute: true })
  */
  describe('合規格式', () => {
    it('小寫字母、數字、連字號的組合', () => {
      control.setValue('my-route-123');

      // 原函數驗證器通過為 null, 斷言用 null
      expect(routeValidator(control)).toBeNull();
    });
  });

  describe('錯誤格式', () => {

    it('包含大寫字母', () => {
      control.setValue('ABC');
      expect(routeValidator(control)).toEqual({ invalidRoute: true });
    });

    it('包含空格', () => {
      control.setValue('my route');
      expect(routeValidator(control)).toEqual({ invalidRoute: true });
    });

    it('包含底線', () => {
      control.setValue('my_route');
      expect(routeValidator(control)).toEqual({ invalidRoute: true });
    });

    it('包含小數點', () => {
      control.setValue('my.route');
      expect(routeValidator(control)).toEqual({ invalidRoute: true });
    });

    it('包含特殊符號（@）', () => {
      control.setValue('my@route');
      expect(routeValidator(control)).toEqual({ invalidRoute: true });
    });

    it('包含斜線', () => {
      control.setValue('my/route');
      expect(routeValidator(control)).toEqual({ invalidRoute: true });
    });

  });

  // 函數不處理空值
  describe('空值（不處理，由套件屬性處理）', () => {

    it('空字串', () => {
      control.setValue('');
      expect(routeValidator(control)).toBeNull();
    });

    it('null', () => {
      control.setValue(null);
      expect(routeValidator(control)).toBeNull();
    });

    it('undefined', () => {
      control.setValue(undefined);
      expect(routeValidator(control)).toBeNull();
    });

  });
});

```

angular.component.ts

```js
import {ComponentFixture, TestBed} from '@angular/core/testing';
import { UserManagement } from './index';

describe('UserManagement', () => {

    let fixture: ComponentFixture<UserManagement>;

    beforeEach(async () => {

        await TestBed.configureTestingModule({
            imports: [UserManagement],
        }).compileComponents();

        fixture = TestBed.createComponent(UserManagement);
    });

    it('測試元件是否有對應正確模板', async () => {
        await fixture.whenStable();

        const el = fixture.nativeElement.querySelector('.page-title');
        expect(el.textContent).toContain('使用者列表');
    });
});
```

#### Service 測試 (with TestBed)

```js
/**
 * 全域 Notify Service
 * 提供 toast 通知功能
 */
@Injectable({
    providedIn: 'root',
})
export class NotifyService {
    private messagesSignal = signal<NotifyMessage[]>([]);
    public messages = this.messagesSignal.asReadonly();
    private nextId = 0;

    /**
     * 顯示成功訊息
     */
    success(message: string, duration = 3000): void {
        this.showMessage('success', message, duration);
    }

    /**
     * 顯示錯誤訊息
     */
    error(message: string, duration = 5000): void {
        this.showMessage('error', message, duration);
    }
```

```js
import { TestBed } from '@angular/core/testing';
import { vi } from 'vitest';
import { NotifyService } from './notify.service';

describe('NotifyService', () => {
    let service: NotifyService;

    beforeEach(() => {
        // 假計時器
        vi.useFakeTimers();
        // 測試環境注入 DI
        TestBed.configureTestingModule({});
        service = TestBed.inject(NotifyService);
    });

    afterEach(() => {
        // 還原
        vi.useRealTimers();
    });

    describe('success()', () => {
        it('新增一筆 type=success 的訊息', () => {
            service.success('操作成功');
            const msgs = service.messages();
            expect(msgs.length).toBe(1);
            expect(msgs[0].type).toBe('success');
            expect(msgs[0].message).toBe('操作成功');
        });

        it('預設 duration 3000ms 後自動移除', () => {
            service.success('操作成功');
            expect(service.messages().length).toBe(1);
            vi.advanceTimersByTime(3000); // 推進 3000ms 後
            expect(service.messages().length).toBe(0);
        });
    });

    describe('error()', () => {
        it('新增一筆 type=error 的訊息', () => {
            service.error('發生錯誤');
            expect(service.messages()[0].type).toBe('error');
        });

        it('預設 duration 5000ms 後自動移除', () => {
            service.error('發生錯誤');
            vi.advanceTimersByTime(4999);
            expect(service.messages().length).toBe(1); // 4999ms 時應該還有 msg
            vi.advanceTimersByTime(1);
            expect(service.messages().length).toBe(0);
        });
    });
```


#### Service 測試 (with testbed & mock)

```js
describe('MenuManagementApi', () => {
  let api: MenuManagementApi;
  let mockApiService: Pick<ApiService, 'get' | 'post' | 'put' | 'delete'>;

  beforeEach(() => {

    // 類似介面替換實作方法
    // 這邊的 of[] 會記錄曾經當作參數的 arg
    mockApiService = {
      get: vi.fn().mockReturnValue(of([])),
      post: vi.fn().mockReturnValue(of({})),
      put: vi.fn().mockReturnValue(of({})),
      delete: vi.fn().mockReturnValue(of({})),
    };
    
    // 替換 DI 注入到 MenuManagementApi
    TestBed.configureTestingModule({
      providers: [
        MenuManagementApi,
        { provide: ApiService, useValue: mockApiService },
      ],
    });

    api = TestBed.inject(MenuManagementApi);
  });

  // 
  describe('Menu CRUD', () => {

    it('getMenus 呼叫 GET /menus', () => {
      // 原函數實作
      // getMenus() {
      //   return this.api.get<Menu[]>('/menus');
      // }
      api.getMenus().subscribe(); // 會把 'menus' 加到 of['menus']
      expect(mockApiService.get).toHaveBeenCalledWith('/menus');
    });

    it('createMenu 呼叫 POST /menus 並帶入 body', () => {
      const body = {
        parentId: null,
        displayName: '測試選單',
        route: 'test',
        icon: null,
        isEndpoint: false,
        endpointName: null,
        isVisible: true,
      };
      api.createMenu(body).subscribe();
      expect(mockApiService.post).toHaveBeenCalledWith('/menus', body);
    });

    it('updateMenu 呼叫 PUT /menus 並帶入 body（skipLoading = true）', () => {
      const body = {
        id: 'abc',
        displayName: '測試選單',
        route: 'test',
        icon: null,
        isEndpoint: false,
        endpointName: null,
        isVisible: true,
        isActive: true,
      };
      api.updateMenu(body).subscribe();
      expect(mockApiService.put).toHaveBeenCalledWith('/menus', body, true);
    });

    it('deleteMenu 呼叫 DELETE /menus/{id}', () => {
      api.deleteMenu('abc').subscribe();
      expect(mockApiService.delete).toHaveBeenCalledWith('/menus/abc');
    });

  });
}
``` 




- TestBed : angular di 環境，在測試檔案注入SERVICE

- RxJS : 建立假的 Observable

- jsdom : 在 Node.js 模擬瀏覽器 dom

- zone.js :  支援 Angular 的變更偵測

- @analogjs/vite-plugin-angular : 編譯工具