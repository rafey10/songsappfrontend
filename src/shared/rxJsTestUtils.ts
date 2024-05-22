import assert from "assert";
import { padStart } from "lodash";
import { TestScheduler } from "rxjs/testing";

/**
 * Utility method newTestScheduler() creates an RxJs TestScheduler
 * which is configured for Jest to simplify redux observable epic tests.
 * Provides a compactly formatted error message which makes debugging easier.
 */
export function newTestScheduler(): TestScheduler {
  return new TestScheduler(deepEqualWithFormattedError);
}

function deepEqualWithFormattedError(actual: any, expected: any) {
  assert.deepStrictEqual(
    actual,
    expected,
    `

Got:
${formatFrames(actual)}

Expected:
${formatFrames(expected)}
    `
  );

  function formatFrames(frames: any[]) {
    return frames
      .map((f) => {
        const frameString = padStart(f.frame, 5);
        const notificationString = JSON.stringify(f.notification);
        return `Frame ${frameString} ${notificationString}\n`;
      })
      .join("");
  }
}
