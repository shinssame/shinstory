// 수업용 샘플 사료 데이터베이스
const sampleSources = {
  samguk: {
    title: "삼국사기: 백제 온조왕 이야기",
    text: "온조왕의 아버지는 추모(주몽)인데 혹은 주몽이 북부여에서 난을 피하여 졸본부여로 왔다. 부여왕은 아들이 없고 딸만 셋이 있었는데 주몽의 비범함을 보고 둘째 딸을 아내로 삼게 하였다. 얼마 후 부여왕이 죽자 주몽이 왕위를 이었다.",
    author: "김부식 (고려시대 유학자)",
    period: "삼국 시대 (고려 인종 때 집필)",
    type: "공식 기록 (정사, 실록 등)"
  },
  musin: {
    title: "무신정변 명분 (고려사)",
    text: "문관들은 매일 의종 왕을 따라다니며 연회를 즐기고 배불리 먹고 마시지만, 무관들은 주리고 추위에 떨며 밤낮으로 경비를 서고 고초를 겪는다. 어찌 이리 차별이 심할 수 있단 말인가!",
    author: "무신정변 세력 (고려 무신)",
    period: "고려 시대 (1170년 무신정변)",
    type: "선언문 / 격문 / 대중 문서"
  },
  manjeok: {
    title: "만적의 난 서원 (고려사)",
    text: "장수와 정승이 어찌 처음부터 씨가 따로 있겠는가? 때가 오면 누구나 될 수 있는 것이다! 우리라고 어찌 채찍 밑에서 고통을 받으며 뼈 빠지게 일만 해야 하는가!",
    author: "만적 및 사노비들",
    period: "고려 시대 (1198년 신의정권 시기)",
    type: "선언문 / 격문 / 대중 문서"
  },
  joseon: {
    title: "조선책략 (황준헌)",
    text: "조선이 거두어야 할 정책으로 러시아를 막는 것(방러)보다 급한 것이 없다. 러시아를 막는 책략은 무엇인가? 중국과 친하고(친중국), 일본과 결합하고(결일본), 미국과 연합함(연미국)으로써 자강을 도모할 따름이다.",
    author: "황준헌 (청나라 외교관)",
    period: "근대 개항기 (1880년)",
    type: "외교 문서 / 조약서"
  }
};

document.addEventListener('DOMContentLoaded', () => {
  const sampleSelect = document.getElementById('sample-select');
  const sourceTitle = document.getElementById('source-title');
  const sourceText = document.getElementById('source-text');
  const authorInput = document.getElementById('author');
  const periodInput = document.getElementById('period');
  const typeSelect = document.getElementById('type');

  const btnAnalyze = document.getElementById('btn-analyze');
  const reportModal = document.getElementById('report-modal');
  const closeModal = document.querySelector('.close-btn');
  const reportOutput = document.getElementById('report-output');
  const btnPrint = document.getElementById('btn-print');

  // 샘플 사료 선택 시 자동 입력
  sampleSelect.addEventListener('change', (e) => {
    const key = e.target.value;
    if (key && sampleSources[key]) {
      const data = sampleSources[key];
      sourceTitle.value = data.title;
      sourceText.value = data.text;
      authorInput.value = data.author;
      periodInput.value = data.period;
      typeSelect.value = data.type;
    } else {
      sourceTitle.value = '';
      sourceText.value = '';
      authorInput.value = '';
      periodInput.value = '';
    }
  });

  // 리포트 생성 버튼 클릭
  btnAnalyze.addEventListener('click', () => {
    const title = sourceTitle.value.trim() || '제목 미기재 사료';
    const text = sourceText.value.trim() || '내용 없음';
    const author = authorInput.value.trim() || '미상';
    const period = periodInput.value.trim() || '미상';
    const type = typeSelect.value;
    const purpose = document.getElementById('purpose').value.trim() || '의견 없음';
    const bias = document.getElementById('bias').value.trim() || '의견 없음';
    const reliability = document.querySelector('input[name="reliability"]:checked').value;
    const conclusion = document.getElementById('conclusion').value.trim() || '의견 없음';

    // 리포트 HTML 구성
    reportOutput.innerHTML = `
      <div class="report-box">
        <h3>📌 사료: ${title}</h3>
        <p style="background: #eee; padding: 0.5rem; border-radius: 4px; font-style: italic; margin-top: 0.5rem;">
          "${text}"
        </p>
      </div>

      <div class="report-box">
        <div class="report-section">
          <h4>1. 출처 및 성격</h4>
          <p><strong>작성자:</strong> ${author} | <strong>시대:</strong> ${period}</p>
          <p><strong>사료 성격:</strong> ${type}</p>
        </div>

        <div class="report-section">
          <h4>2. 비판적 검증</h4>
          <p><strong>작성 목적:</strong> ${purpose}</p>
          <p><strong>편향성/주관성:</strong> ${bias}</p>
          <p><strong>신뢰도 평가:</strong> <mark>${reliability}</mark></p>
        </div>

        <div class="report-section">
          <h4>3. 역사적 의미 및 도출된 사실</h4>
          <p>${conclusion}</p>
        </div>
      </div>
    `;

    reportModal.classList.remove('hidden');
  });

  // 모달 닫기
  closeModal.addEventListener('click', () => {
    reportModal.classList.add('hidden');
  });

  // 인쇄하기
  btnPrint.addEventListener('click', () => {
    window.print();
  });
});
