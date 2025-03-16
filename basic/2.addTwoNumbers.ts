// https://leetcode.com/problems/add-two-numbers/

/*
 * ListNode 정의
 * Definition for singly-linked list.
 */
class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}

function addTwoNumbers(
  l1: ListNode | null,
  l2: ListNode | null
): ListNode | null {
  /**
   * 1. listNode를 반복하여 끝까지 조회한다
   * 2. 두 node를 더해서 자리수가 1을 넘으면 넘은 숫자를 다음 node에서 추가한다.
   * 3. 두 listNode의 next의 값이 없고 carry가 없으면 반복문 정지한다.
   * 
   * 1. Iterate through the listNode until the end.
   * 2. Add the two nodes; if the sum exceeds a single digit, carry over the overflow to the next node
   * 3. Stop the loop when both listNode's next values are null and there is no carry.

   */
  const result: ListNode = new ListNode();

  let curentNode: ListNode = result;
  let targetL1 = l1;
  let targetL2 = l2;
  let carry = 0;

  const getV = (node: ListNode | null) => node?.val ?? 0;

  while (true) {
    let curValue = getV(curentNode) + getV(targetL1) + getV(targetL2) || 0;

    curentNode.val = curValue % 10;
    carry = Math.floor(curValue / 10);

    if (!targetL1?.next && !targetL2?.next && !carry) break;
    targetL1 = targetL1?.next ?? null;
    targetL2 = targetL2?.next ?? null;
    curentNode.next = new ListNode(carry);
    curentNode = curentNode?.next;
  }
  return result;
}
