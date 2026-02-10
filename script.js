// Email templates
const templates = {
    ethical: `These platforms are powered by OpenAI's GPT-4 technology. OpenAI is a major contractor and donor to Immigration and Customs Enforcement (ICE), providing technology used in deportation operations and surveillance of immigrant communities. When Amity funds these products, we are indirectly supporting activities that may harm families in our own district.

As a community that claims to value inclusion and safety for all students, we cannot justify funding companies whose technology is used to separate families and target vulnerable populations. This creates a direct conflict between our stated values and our purchasing decisions.`,

    'ethical-personal': `These platforms are powered by OpenAI's GPT-4 technology. OpenAI is a major contractor and donor to Immigration and Customs Enforcement (ICE), providing technology used in deportation operations and surveillance of immigrant communities. When Amity funds these products, we are indirectly supporting activities that may harm families in our own district.

As a community that claims to value inclusion and safety for all students, we cannot justify funding companies whose technology is used to separate families and target vulnerable populations. This creates a direct conflict between our stated values and our purchasing decisions.

As [a student/parent/community member/immigrant/child of immigrants], I am deeply troubled that my school district would financially support companies involved in deportation operations that could directly affect members of our community.`,

    environmental: `AI systems have a catastrophic environmental footprint. Data centers supporting AI consumed 460 terawatt hours of electricity in 2022—roughly equivalent to the entire nation of France. By 2026, that figure is projected to exceed 1,050 terawatt hours, ranking between Japan and Russia in global energy consumption.

OpenAI's servers alone require approximately 20 million gallons of water daily for cooling. Communities near these data centers are experiencing water shortages and drinking water contamination.

We cannot credibly teach environmental responsibility while simultaneously funding technology that contributes to environmental destruction on such a massive scale. This hypocrisy undermines the integrity of our entire curriculum.`,

    'environmental-student': `AI systems have a catastrophic environmental footprint. Data centers supporting AI consumed 460 terawatt hours of electricity in 2022—roughly equivalent to the entire nation of France. By 2026, that figure is projected to exceed 1,050 terawatt hours, ranking between Japan and Russia in global energy consumption.

OpenAI's servers alone require approximately 20 million gallons of water daily for cooling. Communities near these data centers are experiencing water shortages and drinking water contamination.

As a student, I am taught to care about climate change and take environmental responsibility seriously. Yet my school is making purchasing decisions that directly contradict those lessons. We cannot credibly teach environmental responsibility while simultaneously funding technology that contributes to environmental destruction on such a massive scale.`,

    'academic-integrity': `Students at Amity are explicitly prohibited from using AI tools like ChatGPT for their assignments. Using AI assistance is considered plagiarism under our academic integrity policy, resulting in office referrals, parent contact, and zeros on assignments.

Yet the district is purchasing these same AI tools to evaluate student work. Students are punished for outsourcing their thinking, while the school outsources its judgment. This double standard is indefensible and teaches students that power determines morality, not principles.

If AI cannot be trusted for authentic student work, it cannot be trusted for authentic assessment of that work.`,

    'academic-integrity-student': `Students at Amity are explicitly prohibited from using AI tools like ChatGPT for their assignments. Using AI assistance is considered plagiarism under our academic integrity policy, resulting in office referrals, parent contact, and zeros on assignments.

Yet the district is purchasing these same AI tools to evaluate student work. Students are punished for outsourcing their thinking, while the school outsources its judgment. This double standard is indefensible.

As a student, I am held to a standard of academic honesty that apparently doesn't apply to the institution itself. This teaches me that power determines morality, not principles. If AI cannot be trusted for authentic student work, it cannot be trusted for authentic assessment of that work.`,

    accuracy: `These systems are fundamentally unreliable. Students have reported multiple instances of AI incorrectly marking responses as partial or no credit, only to have them verified as fully correct upon teacher review. When a system regularly requires human correction, it has already failed its primary purpose.

Grades determine GPAs, transcripts, college admissions, and scholarship opportunities. A system that makes errors requiring correction after grades are assigned should never be trusted to assess student work in the first place. The burden then falls on students to notice mistakes, challenge them, and hope human review catches every error. That is unreasonable and introduces unnecessary stress and inequity.`,

    'accuracy-parent': `These systems are fundamentally unreliable. Students have reported multiple instances of AI incorrectly marking responses as partial or no credit, only to have them verified as fully correct upon teacher review. When a system regularly requires human correction, it has already failed its primary purpose.

As a parent, I am deeply concerned that my child's grades—which directly affect their GPA, transcript, college admissions, and scholarship opportunities—could be determined by an error-prone algorithm. My child's future should not depend on catching an algorithm's mistakes. A system that makes errors requiring correction after grades are assigned should never be trusted to assess student work in the first place.`,

    'teacher-concerns': `The teachers who would be required to use these tools have expressed serious concerns. They worry that AI-mediated feedback erodes the teacher-student relationships that make learning meaningful. They worry about job security as "learning tools" become replacement tools. They worry about being pressured to use technology they're inadequately trained on and don't believe serves students.

When the actual experts in education—our teachers—unanimously oppose a technology, that should carry far more weight than a vendor's sales pitch. Teachers understand what students need in ways no algorithm can replicate.`,

    'teacher-concerns-educator': `As an educator at Amity, I can state directly that these tools undermine rather than support my ability to know and teach my students effectively. AI-mediated feedback erodes the teacher-student relationships that make learning meaningful. These relationships are built through engaging deeply with student work, understanding their thinking, and recognizing their growth—none of which an algorithm can replicate.

I am also concerned about the pressure to use technology I'm inadequately trained on and don't believe serves students well. When teachers unanimously oppose a technology, that professional judgment should carry far more weight than administrative efficiency or vendor promises.`,

    'learning-tool': `I understand the administration has clarified these are "learning tools" rather than "grading tools." This distinction is meaningless for three reasons:

First, any tool that provides numerical feedback (like "1 out of 3") influences grades, whether directly or indirectly. Students and parents cannot distinguish between formative feedback and summative assessment when both use the same scoring system.

Second, even if these tools never determine a single final grade, the ethical problems remain unchanged. Funding OpenAI still supports ICE operations. The environmental impact is identical. The message about AI's role in education is the same.

Third, without clear, enforced guidelines on appropriate use, "learning tools" inevitably become grading tools in practice. Once purchased, there's institutional pressure to justify the expense and expand usage.`
};

// Generate letter function
function generateLetter() {
    const name = document.getElementById('name').value.trim();
    const role = document.getElementById('role').value;
    const address = document.getElementById('address').value.trim();
    
    const selectedConcerns = Array.from(document.querySelectorAll('.concern-checkbox:checked'))
        .map(cb => cb.value);

    if (!name) {
        alert('Please enter your name.');
        return;
    }

    if (selectedConcerns.length === 0) {
        alert('Please select at least one concern.');
        return;
    }

    if (selectedConcerns.length > 3) {
        alert('Please select no more than 3 concerns for a focused letter.');
        return;
    }

    // Build the letter
    let letter = `Dear Amity Board of Education,

I am writing to oppose funding for AI-powered learning tools at Amity Regional High School, including Class Companion, SchoolAI, and Magic School AI.

`;

    // Add selected concern sections
    selectedConcerns.forEach((concern, index) => {
        if (index > 0) letter += '\n\n';
        letter += templates[concern];
    });

    // Add closing
    letter += `

For these reasons, I am asking you to vote no on this funding. Do not make Amity complicit in supporting ICE operations, environmental destruction, or the erosion of teacher-student relationships. Invest in people, not algorithms.

Students, families, and teachers are telling you this is wrong. Please listen.

Sincerely,

${name}
${role}`;

    if (address) {
        letter += `\n${address}`;
    }

    // Display the letter
    document.getElementById('letterContent').textContent = letter;
    document.getElementById('letterOutput').style.display = 'block';
    
    // Scroll to letter
    document.getElementById('letterOutput').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// Copy to clipboard function
function copyToClipboard() {
    const letterText = document.getElementById('letterContent').textContent;
    
    navigator.clipboard.writeText(letterText).then(() => {
        const btn = document.getElementById('copyBtn');
        const originalText = btn.textContent;
        btn.textContent = '✓ Copied!';
        btn.style.backgroundColor = '#2e7d32';
        
        setTimeout(() => {
            btn.textContent = originalText;
            btn.style.backgroundColor = '';
        }, 2000);
    }).catch(err => {
        alert('Failed to copy. Please select and copy the text manually.');
    });
}

// Download as text file function
function downloadLetter() {
    const letterText = document.getElementById('letterContent').textContent;
    const name = document.getElementById('name').value.trim();
    
    const blob = new Blob([letterText], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `letter-to-amity-board-${name.replace(/\s+/g, '-').toLowerCase()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
}

// Event listeners
document.getElementById('generateBtn').addEventListener('click', generateLetter);
document.getElementById('copyBtn').addEventListener('click', copyToClipboard);
document.getElementById('downloadBtn').addEventListener('click', downloadLetter);

// Limit checkbox selection to 3
document.querySelectorAll('.concern-checkbox').forEach(checkbox => {
    checkbox.addEventListener('change', function() {
        const checkedBoxes = document.querySelectorAll('.concern-checkbox:checked');
        if (checkedBoxes.length > 3) {
            this.checked = false;
            alert('Please select no more than 3 concerns for a focused, effective letter.');
        }
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
});
